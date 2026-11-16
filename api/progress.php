<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once "../config/database.php";

try {

    // --------------------------------
    // Get user_id
    // --------------------------------

    $userId = isset($_GET['user_id'])
        ? (int) $_GET['user_id']
        : 0;

    if ($userId <= 0) {
        http_response_code(400);

        echo json_encode([
            'success' => false,
            'message' => 'Invalid user_id'
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }

    // --------------------------------
    // Get user progress
    // --------------------------------

    $stmt = $conn->prepare("
        SELECT
            skill_id,
            progress
        FROM user_progress
        WHERE user_id = ?
    ");

    if (!$stmt) {
        throw new Exception($conn->error);
    }

    $stmt->bind_param("i", $userId);

    $stmt->execute();

    $result = $stmt->get_result();

    $progress = [];

    while ($row = $result->fetch_assoc()) {

        $progress[$row['skill_id']] = (float) $row['progress'];
    }

    $stmt->close();

    // --------------------------------
    // Response
    // --------------------------------

    echo json_encode([
        'success' => true,
        'data' => $progress
    ], JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {

    http_response_code(500);

    echo json_encode([
        'success' => false,
        'message' => 'Failed to fetch progress',
        'error' => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}