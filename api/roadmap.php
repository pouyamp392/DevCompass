<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

require_once "../config/database.php";
require_once "../helpers/response.php";

try {

    // ========================================
    // GET
    // دریافت هدف فعلی کاربر
    // ========================================

    if ($_SERVER["REQUEST_METHOD"] === "GET") {

        $userId = isset($_GET["user_id"])
            ? (int) $_GET["user_id"]
            : 0;

        if ($userId <= 0) {
            sendResponse([
                "success" => false,
                "message" => "شناسه کاربر نامعتبر است"
            ], 400);
        }

        $stmt = $conn->prepare("
            SELECT roadmap_goal
            FROM users
            WHERE id = ?
            LIMIT 1
        ");

        if (!$stmt) {
            throw new Exception($conn->error);
        }

        $stmt->bind_param("i", $userId);
        $stmt->execute();

        $result = $stmt->get_result();
        $user = $result->fetch_assoc();

        if (!$user) {
            sendResponse([
                "success" => false,
                "message" => "کاربر پیدا نشد"
            ], 404);
        }

        sendResponse([
            "success" => true,
            "data" => [
                "roadmap_goal" => $user["roadmap_goal"]
            ]
        ]);
    }


    // ========================================
    // POST
    // ذخیره هدف کاربر
    // ========================================

    if ($_SERVER["REQUEST_METHOD"] === "POST") {

        $input = json_decode(
            file_get_contents("php://input"),
            true
        );

        $userId = isset($input["user_id"])
            ? (int) $input["user_id"]
            : 0;

        $roadmapGoal = isset($input["roadmap_goal"])
            ? trim($input["roadmap_goal"])
            : "";

        if ($userId <= 0) {
            sendResponse([
                "success" => false,
                "message" => "شناسه کاربر نامعتبر است"
            ], 400);
        }

        if ($roadmapGoal === "") {
            sendResponse([
                "success" => false,
                "message" => "هدف مسیر مشخص نشده است"
            ], 400);
        }

        $allowedGoals = [
            "frontend",
            "backend",
            "ai",
            "devops",
            "soft"
        ];
        if (!in_array($roadmapGoal, $allowedGoals, true)) {
            sendResponse([
                "success" => false,
                "message" => "هدف مسیر نامعتبر است"
            ], 400);
        }

        $stmt = $conn->prepare("
            UPDATE users
            SET roadmap_goal = ?
            WHERE id = ?
        ");

        if (!$stmt) {
            throw new Exception($conn->error);
        }

        $stmt->bind_param(
            "si",
            $roadmapGoal,
            $userId
        );

        $stmt->execute();

        // اگر هیچ ردیفی پیدا نشده باشد
        if ($stmt->affected_rows === 0) {

            $checkStmt = $conn->prepare("
                SELECT id
                FROM users
                WHERE id = ?
                LIMIT 1
            ");

            if (!$checkStmt) {
                throw new Exception($conn->error);
            }

            $checkStmt->bind_param("i", $userId);
            $checkStmt->execute();

            $checkResult = $checkStmt->get_result();

            if (!$checkResult->fetch_assoc()) {
                sendResponse([
                    "success" => false,
                    "message" => "کاربر پیدا نشد"
                ], 404);
            }
        }

        sendResponse([
            "success" => true,
            "message" => "هدف مسیر با موفقیت ذخیره شد",
            "data" => [
                "roadmap_goal" => $roadmapGoal
            ]
        ]);
    }


    // ========================================
    // METHOD NOT ALLOWED
    // ========================================

    sendResponse([
        "success" => false,
        "message" => "Method not allowed"
    ], 405);


} catch (Exception $e) {

    error_log(
        "Roadmap API Error: " . $e->getMessage()
    );

    sendResponse([
        "success" => false,
        "message" => "خطا در پردازش درخواست",
        "error" => $e->getMessage()
    ], 500);
}