
<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: https://devcompass-api.infinityfree.io");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

error_reporting(E_ALL);
ini_set('log_errors', '1');

$conn = null;
$transactionStarted = false;

// Handle CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

try {

    // Database connection
    require_once "../config/database.php";

    // Read request
    $input = json_decode(file_get_contents("php://input"), true);

    if (!is_array($input)) {
        throw new Exception("Invalid JSON body");
    }

    $userId = isset($input['user_id']) ? (int)$input['user_id'] : 0;
    $skillId = isset($input['skill_id']) ? (int)$input['skill_id'] : 0;
    $progress = isset($input['progress']) ? (float)$input['progress'] : 0;

    if ($userId <= 0 || $skillId <= 0) {
        throw new Exception("Invalid parameters");
    }

    // Normalize progress
    $progress = max(0, min(100, $progress));
    $isCompleted = $progress >= 100 ? 1 : 0;

    // Start transaction
    $conn->begin_transaction();
    $transactionStarted = true;

    // Get skill information
    $skillStmt = $conn->prepare(
        "SELECT id, xp FROM skills WHERE id = ? LIMIT 1 FOR UPDATE"
    );

    $skillStmt->bind_param("i", $skillId);
    $skillStmt->execute();

    $skill = $skillStmt->get_result()->fetch_assoc();
    $skillStmt->close();

    if (!$skill) {
        throw new Exception("Skill not found");
    }

    $skillXP = (int)$skill['xp'];

    // Get existing progress
    $checkStmt = $conn->prepare("
        SELECT id, progress, completed, completed_at
        FROM user_progress
        WHERE user_id = ? AND skill_id = ?
        LIMIT 1
        FOR UPDATE
    ");

    $checkStmt->bind_param("ii", $userId, $skillId);
    $checkStmt->execute();

    $existing = $checkStmt->get_result()->fetch_assoc();
    $checkStmt->close();

    // Calculate XP
    $xpEarned = 0;

    if ($existing) {

        $wasCompleted = (int)$existing['completed'] === 1;

        if ($wasCompleted) {
            $progress = 100;
            $isCompleted = 1;
        } elseif ($isCompleted) {
            $xpEarned = $skillXP;
        }

    } elseif ($isCompleted) {
        $xpEarned = $skillXP;
    }

    // Update or insert progress
    if ($existing) {

        $progressId = (int)$existing['id'];

        $stmt = $conn->prepare("
            UPDATE user_progress
            SET progress = ?,
                completed = ?,
                completed_at = ?
            WHERE id = ?
        ");

        $completedAt = $isCompleted
            ? ($existing['completed_at'] ?: date("Y-m-d H:i:s"))
            : null;

        $stmt->bind_param(
            "disi",
            $progress,
            $isCompleted,
            $completedAt,
            $progressId
        );

    } else {

        $completedAt = $isCompleted
            ? date("Y-m-d H:i:s")
            : null;

        $stmt = $conn->prepare("
            INSERT INTO user_progress
            (user_id, skill_id, progress, completed, completed_at)
            VALUES (?, ?, ?, ?, ?)
        ");

        $stmt->bind_param(
            "iidis",
            $userId,
            $skillId,
            $progress,
            $isCompleted,
            $completedAt
        );
    }

    $stmt->execute();
    $stmt->close();

    // Update user XP
    if ($xpEarned > 0) {

        $xpStmt = $conn->prepare("
            UPDATE users
            SET xp = xp + ?
            WHERE id = ?
        ");

        $xpStmt->bind_param("ii", $xpEarned, $userId);
        $xpStmt->execute();
        $xpStmt->close();
    }

    // Get updated user
    $userStmt = $conn->prepare("
        SELECT id, username, email, avatar, level, xp,
               streak, roadmap_goal, updated_at
        FROM users
        WHERE id = ?
        LIMIT 1
    ");

    $userStmt->bind_param("i", $userId);
    $userStmt->execute();

    $updatedUser = $userStmt->get_result()->fetch_assoc();
    $userStmt->close();

    if (!$updatedUser) {
        throw new Exception("User not found");
    }

    // Convert numeric values
    $updatedUser['id'] = (int)$updatedUser['id'];
    $updatedUser['xp'] = (int)$updatedUser['xp'];
    $updatedUser['level'] = (int)$updatedUser['level'];
    $updatedUser['streak'] = (int)$updatedUser['streak'];

    // Commit transaction
    $conn->commit();
    $transactionStarted = false;

    // Success response
    echo json_encode([
        'success' => true,
        'message' => 'Progress updated successfully',
        'data' => [
            'skill' => [
                'skill_id' => $skillId,
                'progress' => $progress,
                'completed' => (bool)$isCompleted
            ],
            'xp_earned' => $xpEarned,
            'user' => $updatedUser
        ]
    ], JSON_UNESCAPED_UNICODE);

} catch (Throwable $e) {

    if ($transactionStarted && $conn) {
        try {
            $conn->rollback();
        } catch (Throwable $rollbackError) {
            error_log($rollbackError->getMessage());
        }
    }

    error_log("Update Progress Error: " . $e->getMessage());

    http_response_code(500);

    echo json_encode([
        'success' => false,
        'message' => 'Failed to update progress',
        'error' => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
