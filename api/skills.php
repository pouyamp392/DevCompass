<?php


header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once "../config/database.php";
try {

    /*
    |--------------------------------------------------------------------------
    | 1. Get Skills
    |--------------------------------------------------------------------------
    */

    $sql = "
        SELECT
            id,
            slug,
            title,
            icon,
            difficulty,
            time,
            xp,
            category,
            type,
            stage,
            priority,
            description
        FROM skills
        ORDER BY stage ASC, id ASC
    ";

    $result = $conn->query($sql);

    if (!$result) {
        throw new Exception($conn->error);
    }

    $skills = [];

    while ($row = $result->fetch_assoc()) {

        $row['difficulty'] = (int) $row['difficulty'];
        $row['time'] = (int) $row['time'];
        $row['xp'] = (int) $row['xp'];
        $row['stage'] = (int) $row['stage'];

        $row['requires'] = [];
        $row['goals'] = [];
        $row['resources'] = [];
        $row['project'] = null;
        $row['exercise'] = null;

        $skills[$row['id']] = $row;
    }


    /*
    |--------------------------------------------------------------------------
    | 2. Get Goals
    |--------------------------------------------------------------------------
    */

    $sql = "
        SELECT
            sg.skill_id,
            g.slug
        FROM skill_goals sg
        INNER JOIN goals g
            ON sg.goal_id = g.id
    ";

    $result = $conn->query($sql);

    if (!$result) {
        throw new Exception($conn->error);
    }

    while ($row = $result->fetch_assoc()) {

        if (isset($skills[$row['skill_id']])) {

            $skills[$row['skill_id']]['goals'][] = $row['slug'];

        }
    }


    /*
    |--------------------------------------------------------------------------
    | 3. Get Dependencies
    |--------------------------------------------------------------------------
    */

    $sql = "
        SELECT
            skill_id,
            dependency_skill_id
        FROM skill_dependencies
    ";

    $result = $conn->query($sql);

    if (!$result) {
        throw new Exception($conn->error);
    }

    while ($row = $result->fetch_assoc()) {

        if (isset($skills[$row['skill_id']])) {

            $skills[$row['skill_id']]['requires'][] =
                $row['dependency_skill_id'];

        }
    }


    /*
    |--------------------------------------------------------------------------
    | 4. Get Resources
    |--------------------------------------------------------------------------
    */

    $sql = "
        SELECT
            id,
            skill_id,
            title,
            url
        FROM resources
        ORDER BY id ASC
    ";

    $result = $conn->query($sql);

    if (!$result) {
        throw new Exception($conn->error);
    }

    while ($row = $result->fetch_assoc()) {

        if (isset($skills[$row['skill_id']])) {

            $skills[$row['skill_id']]['resources'][] = [
                'title' => $row['title'],
                'url' => $row['url']
            ];

        }
    }


    /*
    |--------------------------------------------------------------------------
    | 5. Get Projects
    |--------------------------------------------------------------------------
    */

    $sql = "
        SELECT
            id,
            skill_id,
            title,
            description
        FROM projects
        ORDER BY id ASC
    ";

    $result = $conn->query($sql);

    if (!$result) {
        throw new Exception($conn->error);
    }

    while ($row = $result->fetch_assoc()) {

        if (isset($skills[$row['skill_id']])) {

            $skills[$row['skill_id']]['project'] = [
                'title' => $row['title'],
                'description' => $row['description']
            ];

        }
    }


    /*
    |--------------------------------------------------------------------------
    | 6. Get Exercises
    |--------------------------------------------------------------------------
    */

    $sql = "
        SELECT
            id,
            skill_id,
            title,
            description
        FROM exercises
        ORDER BY id ASC
    ";

    $result = $conn->query($sql);

    if (!$result) {
        throw new Exception($conn->error);
    }

    while ($row = $result->fetch_assoc()) {

        if (isset($skills[$row['skill_id']])) {

            $skills[$row['skill_id']]['exercise'] = [
                'title' => $row['title'],
                'description' => $row['description']
            ];

        }
    }


    /*
    |--------------------------------------------------------------------------
    | Final Response
    |--------------------------------------------------------------------------
    */

    echo json_encode([
        'success' => true,
        'data' => array_values($skills)
    ], JSON_UNESCAPED_UNICODE);


} catch (Exception $e) {

    http_response_code(500);

    echo json_encode([
        'success' => false,
        'message' => 'Failed to fetch skills',
        'error' => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);

}