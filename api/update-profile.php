<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);

    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed'
    ], JSON_UNESCAPED_UNICODE);

    exit;
}

require_once "../config/database.php";

try {

    // ========================================
    // READ INPUT
    // ========================================

    $input = json_decode(
        file_get_contents("php://input"),
        true
    );

    if (!is_array($input)) {
        http_response_code(400);

        echo json_encode([
            'success' => false,
            'message' => 'Invalid request data'
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }

    $userId = intval(
        $input['user_id'] ?? 0
    );

    $username = trim(
        $input['username'] ?? ''
    );

    $email = trim(
        $input['email'] ?? ''
    );

    // ========================================
    // VALIDATE USER ID
    // ========================================

    if (!$userId) {

        http_response_code(400);

        echo json_encode([
            'success' => false,
            'message' => 'Invalid user ID'
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }

    // ========================================
    // VALIDATE USERNAME
    // ========================================

    if ($username === '') {

        http_response_code(400);

        echo json_encode([
            'success' => false,
            'message' => 'Username is required'
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }

    // ========================================
    // VALIDATE EMAIL
    // ========================================

    if ($email === '') {

        http_response_code(400);

        echo json_encode([
            'success' => false,
            'message' => 'Email is required'
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }

    if (!filter_var(
        $email,
        FILTER_VALIDATE_EMAIL
    )) {

        http_response_code(400);

        echo json_encode([
            'success' => false,
            'message' => 'Invalid email address'
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }

    // ========================================
    // CHECK USER EXISTS
    // ========================================

    $stmt = $conn->prepare("
        SELECT id
        FROM users
        WHERE id = ?
        LIMIT 1
    ");

    if (!$stmt) {
        throw new Exception(
            $conn->error
        );
    }

    $stmt->bind_param(
        "i",
        $userId
    );

    $stmt->execute();

    $result =
        $stmt->get_result();

    $existingUser =
        $result->fetch_assoc();

    $stmt->close();

    if (!$existingUser) {

        http_response_code(404);

        echo json_encode([
            'success' => false,
            'message' => 'User not found'
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }

    // ========================================
    // CHECK USERNAME / EMAIL UNIQUENESS
    // ========================================

    $stmt = $conn->prepare("
        SELECT id
        FROM users
        WHERE (email = ? OR username = ?)
        AND id != ?
        LIMIT 1
    ");

    if (!$stmt) {
        throw new Exception(
            $conn->error
        );
    }

    $stmt->bind_param(
        "ssi",
        $email,
        $username,
        $userId
    );

    $stmt->execute();

    $result =
        $stmt->get_result();

    if ($result->num_rows > 0) {

        $stmt->close();

        http_response_code(409);

        echo json_encode([
            'success' => false,
            'message' =>
                'Username or email already exists'
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }

    $stmt->close();

    // ========================================
    // UPDATE PROFILE
    // ========================================

    $stmt = $conn->prepare("
        UPDATE users
        SET
            username = ?,
            email = ?
        WHERE id = ?
    ");

    if (!$stmt) {
        throw new Exception(
            $conn->error
        );
    }

    $stmt->bind_param(
        "ssi",
        $username,
        $email,
        $userId
    );

    if (!$stmt->execute()) {
        throw new Exception(
            $stmt->error
        );
    }

    $stmt->close();

    // ========================================
    // GET UPDATED USER
    // IMPORTANT:
    // Return the same user data needed
    // by AuthContext / Profile
    // ========================================

    $stmt = $conn->prepare("
    SELECT
        id,
        username,
        email,
        level,
        xp,
        streak,
        roadmap_goal,
        avatar,
        last_activity,
        created_at,
        updated_at
    FROM users
    WHERE id = ?
    LIMIT 1
");

    if (!$stmt) {
        throw new Exception(
            $conn->error
        );
    }

    $stmt->bind_param(
        "i",
        $userId
    );

    $stmt->execute();

    $result =
        $stmt->get_result();

    $user =
        $result->fetch_assoc();

    $stmt->close();

    if (!$user) {

        http_response_code(404);

        echo json_encode([
            'success' => false,
            'message' => 'User not found'
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }

    // ========================================
    // RESPONSE
    // ========================================

    echo json_encode([
        'success' => true,

        'message' =>
            'Profile updated successfully',

        'data' => [
            'user' => $user
        ]

    ], JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {

    http_response_code(500);

    echo json_encode([
        'success' => false,
        'message' =>
            'Profile update failed',

        'error' =>
            $e->getMessage()

    ], JSON_UNESCAPED_UNICODE);
}