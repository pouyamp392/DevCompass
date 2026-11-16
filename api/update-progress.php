<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// --------------------------------
// Handle CORS preflight
// --------------------------------
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// --------------------------------
// Only POST requests
// --------------------------------
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

require_once "../config/database.php";

// TODO: اگر فایل میدلور یا توابع احراز هویت (JWT/Session) دارید، اینجا require کنید
// require_once "../middleware/auth.php";

try {

    // --------------------------------
    // 1. Authentication (امنیتی)
    // --------------------------------
    // مثال احراز هویت با سشن یا توکن:
    // $userId = getAuthenticatedUserId();

    // اگر از سیستم احراز هویت هدر Authorization (JWT) استفاده می‌کنید:
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';

    /*
       تذکر مهم: در این بخش باید توکن کاربر اعتبارسنجی شده و userId استخراج شود.
       فعلاً جهت عدم شکستن برنامه، اگر Auth Middleware ندارید، از input خوانده می‌شود
       اما حتماً در مرحله بعد به JWT/Session تغییر یابد.
    */
    $input = json_decode(file_get_contents("php://input"), true);

    if (!is_array($input)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Invalid JSON body'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $userId = isset($input['user_id']) ? (int) $input['user_id'] : 0; // جایگزین با User ID حاصل از Auth
    $skillId = isset($input['skill_id']) ? (int) $input['skill_id'] : 0;
    $progress = isset($input['progress']) ? (float) $input['progress'] : 0;

    if ($userId <= 0 || $skillId <= 0) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Invalid parameters'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // نرمال‌سازی درصد پیشرفت (0 تا 100)
    $progress = max(0, min(100, $progress));
    $isCompleted = $progress >= 100 ? 1 : 0;

    // --------------------------------
    // Start Transaction
    // --------------------------------
    $conn->begin_transaction();

    // ==================================================
    // 2. Fetch Skill Info
    // ==================================================
    $skillStmt = $conn->prepare("SELECT id, xp FROM skills WHERE id = ? LIMIT 1 FOR UPDATE");
    $skillStmt->bind_param("i", $skillId);
    $skillStmt->execute();
    $skill = $skillStmt->get_result()->fetch_assoc();
    $skillStmt->close();

    if (!$skill) {
        throw new Exception("Skill not found");
    }

    $skillXP = (int) $skill['xp'];

    // ==================================================
    // 3. Fetch Existing User Progress
    // ==================================================
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

    // ==================================================
    // 4. Determine XP Reward (جلوگیری از Double XP)
    // ==================================================
    $xpEarned = 0;

    if ($existing) {
        $wasCompleted = (int) $existing['completed'] === 1;

        if ($wasCompleted) {
            // اگر قبلاً کامل شده، درصد روی 100 می‌ماند و XP مجدد تعلق نمی‌گیرد
            $progress = 100;
            $isCompleted = 1;
        } elseif ($isCompleted) {
            // اولین بار است که به 100% می‌رسد
            $xpEarned = $skillXP;
        }
    } else if ($isCompleted) {
        // رکورد جدیدی ثبت می‌شود و مستقیماً کامل شده است
        $xpEarned = $skillXP;
    }

    // ==================================================
    // 5. Update / Insert user_progress
    // ==================================================
    if ($existing) {
        $progressId = (int) $existing['id'];

        if ($isCompleted) {
            $stmt = $conn->prepare("
                UPDATE user_progress
                SET progress = ?, completed = 1, completed_at = COALESCE(completed_at, NOW())
                WHERE id = ?
            ");
            $stmt->bind_param("di", $progress, $progressId);
        } else {
            $stmt = $conn->prepare("
                UPDATE user_progress
                SET progress = ?, completed = 0, completed_at = NULL
                WHERE id = ?
            ");
            $stmt->bind_param("di", $progress, $progressId);
        }
        $stmt->execute();
        $stmt->close();
    } else {
        $completedAt = $isCompleted ? date("Y-m-d H:i:s") : null;
        $stmt = $conn->prepare("
            INSERT INTO user_progress (user_id, skill_id, progress, completed, completed_at)
            VALUES (?, ?, ?, ?, ?)
        ");
        $stmt->bind_param("iidis", $userId, $skillId, $progress, $isCompleted, $completedAt);
        $stmt->execute();
        $stmt->close();
    }

    // ==================================================
    // 6. Add XP & Update Level (در صورت نیاز)
    // ==================================================
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

    // ==================================================
    // 7. Get Full Updated User Object (برای Sync با فرانت)
    // ==================================================
    $userStmt = $conn->prepare("
        SELECT id, username, email, avatar, level, xp, streak, roadmap_goal, updated_at
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

    // تبدیل تایپ‌های عددی برای جلوگیری از String شدن در JSON
    $updatedUser['id'] = (int) $updatedUser['id'];
    $updatedUser['xp'] = (int) $updatedUser['xp'];
    $updatedUser['level'] = (int) $updatedUser['level'];
    $updatedUser['streak'] = (int) $updatedUser['streak'];

    // ==================================================
    // 8. Commit & Response
    // ==================================================
    $conn->commit();

    echo json_encode([
        'success' => true,
        'message' => 'Progress updated successfully',
        'data' => [
            'skill' => [
                'skill_id' => $skillId,
                'progress' => $progress,
                'completed' => (bool) $isCompleted,
            ],
            'xp_earned' => $xpEarned,
            'user' => $updatedUser // شیء کامل کاربر برای آپدیت سریع AuthContext
        ]
    ], JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    if ($conn->connect_errno === 0) {
        $conn->rollback();
    }

    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to update progress',
        'error' => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}