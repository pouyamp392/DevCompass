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

    /*
    |--------------------------------------------------------------------------
    | 1. Get JSON data
    |--------------------------------------------------------------------------
    */

    $data = json_decode(file_get_contents("php://input"), true);

    $email = trim($data['email'] ?? '');
    $password = $data['password'] ?? '';

    /*
    |--------------------------------------------------------------------------
    | 2. Validate
    |--------------------------------------------------------------------------
    */

    if ($email === '' || $password === '') {

        http_response_code(400);

        echo json_encode([
            'success' => false,
            'message' => 'ایمیل و رمز عبور الزامی هستند'
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }

    /*
    |--------------------------------------------------------------------------
    | 3. Find user
    |--------------------------------------------------------------------------
    */

    $stmt = $conn->prepare("
    SELECT
        id,
        username,
        email,
        password,
        avatar,
        level,
        xp,
        streak,
        roadmap_goal,
        last_activity,
        created_at,
        updated_at
    FROM users
    WHERE email = ?
    LIMIT 1
");
    if (!$stmt) {
        throw new Exception($conn->error);
    }

    $stmt->bind_param("s", $email);
    $stmt->execute();

    $result = $stmt->get_result();

    /*
    |--------------------------------------------------------------------------
    | 4. User not found
    |--------------------------------------------------------------------------
    */

    if ($result->num_rows === 0) {

        http_response_code(401);

        echo json_encode([
            'success' => false,
            'message' => 'ایمیل یا رمز عبور اشتباه است'
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }

    $user = $result->fetch_assoc();

    /*
    |--------------------------------------------------------------------------
    | 5. Verify password
    |--------------------------------------------------------------------------
    */

    if (!password_verify($password, $user['password'])) {

        http_response_code(401);

        echo json_encode([
            'success' => false,
            'message' => 'ایمیل یا رمز عبور اشتباه است'
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }

    /*
    |--------------------------------------------------------------------------
    | 6. Remove password from response
    |--------------------------------------------------------------------------
    */

    unset($user['password']);

    /*
    |--------------------------------------------------------------------------
    | 7. Update last activity
    |--------------------------------------------------------------------------
    */

    $update = $conn->prepare("
        UPDATE users
        SET last_activity = NOW()
        WHERE id = ?
    ");

    if ($update) {
        $update->bind_param("i", $user['id']);
        $update->execute();
        $update->close();
    }

    /*
    |--------------------------------------------------------------------------
    | 8. Success
    |--------------------------------------------------------------------------
    */

    echo json_encode([
        'success' => true,
        'message' => 'ورود با موفقیت انجام شد',
        'data' => [
            'user' => $user
        ]
    ], JSON_UNESCAPED_UNICODE);

    $stmt->close();

} catch (Exception $e) {

    http_response_code(500);

    echo json_encode([
        'success' => false,
        'message' => 'خطا در ورود',
        'error' => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}