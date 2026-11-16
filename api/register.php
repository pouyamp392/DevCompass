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

    $input = json_decode(
        file_get_contents("php://input"),
        true
    );

    $username = trim($input['username'] ?? '');
    $email = trim($input['email'] ?? '');
    $password = $input['password'] ?? '';

    /*
    |--------------------------------------------------------------------------
    | Validation
    |--------------------------------------------------------------------------
    */

    if ($username === '' || $email === '' || $password === '') {

        http_response_code(400);

        echo json_encode([
            'success' => false,
            'message' => 'Username, email and password are required'
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {

        http_response_code(400);

        echo json_encode([
            'success' => false,
            'message' => 'Invalid email address'
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }

    if (strlen($password) < 8) {

        http_response_code(400);

        echo json_encode([
            'success' => false,
            'message' => 'Password must be at least 8 characters'
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }

    /*
    |--------------------------------------------------------------------------
    | Check existing user
    |--------------------------------------------------------------------------
    */

    $stmt = $conn->prepare("
        SELECT id
        FROM users
        WHERE email = ? OR username = ?
        LIMIT 1
    ");

    if (!$stmt) {
        throw new Exception($conn->error);
    }

    $stmt->bind_param(
        "ss",
        $email,
        $username
    );

    $stmt->execute();

    $result = $stmt->get_result();

    if ($result->num_rows > 0) {

        http_response_code(409);

        echo json_encode([
            'success' => false,
            'message' => 'Username or email already exists'
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }

    $stmt->close();

    /*
    |--------------------------------------------------------------------------
    | Hash Password
    |--------------------------------------------------------------------------
    */

    $hashedPassword = password_hash(
        $password,
        PASSWORD_DEFAULT
    );

    /*
    |--------------------------------------------------------------------------
    | Create User
    |--------------------------------------------------------------------------
    */

    $stmt = $conn->prepare("
        INSERT INTO users
        (
            username,
            email,
            password,
            level,
            xp,
            streak
        )
        VALUES (?, ?, ?, 1, 0, 0)
    ");

    if (!$stmt) {
        throw new Exception($conn->error);
    }

    $stmt->bind_param(
        "sss",
        $username,
        $email,
        $hashedPassword
    );

    if (!$stmt->execute()) {
        throw new Exception($stmt->error);
    }

    $userId = $stmt->insert_id;

    $stmt->close();

    /*
    |--------------------------------------------------------------------------
    | Response
    |--------------------------------------------------------------------------
    */

    echo json_encode([
        'success' => true,
        'message' => 'Registration successful',
        'data' => [
            'user' => [
                'id' => $userId,
                'username' => $username,
                'email' => $email,
                'level' => 1,
                'xp' => 0,
                'streak' => 0,
                'roadmap_goal' => null,
                'avatar' => null,
                'last_activity' => null,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ]
        ]
    ], JSON_UNESCAPED_UNICODE);
} catch (Exception $e) {

    http_response_code(500);

    echo json_encode([
        'success' => false,
        'message' => 'Registration failed',
        'error' => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
