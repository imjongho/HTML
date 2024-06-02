<?php
// 데이터베이스 연결 정보
$host = 'localhost';
$user = 'root';
$password = 'jongho4502@';
$dbname = 'course_registration';

// MySQLi 객체 지향 방식으로 연결
$conn = new mysqli($host, $user, $password, $dbname);

// 연결 에러 확인
if ($conn->connect_error) {
    die("연결 실패: " . $conn->connect_error);
}

// 사용자 입력 받기 (POST 방식 가정)
$student_id = $_POST['student_id'];
$input_password = $_POST['password'];

// SQL 인젝션 방지를 위한 준비된 문 사용
$stmt = $conn->prepare("SELECT password, school_year, semester, credits_apply FROM student WHERE student_id = ?");
$stmt->bind_param("s", $student_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $db_password = $row['password']; // 데이터베이스에서 가져온 평문 비밀번호

    // 비밀번호 검증
    if ($input_password === $db_password) {
        // 성공한 사용자 정보를 JSON 형식으로 반환
        echo json_encode([
            'success' => true,
            'studentId' => $student_id,
            'schoolYear' => $row['school_year'],
            'semester' => $row['semester'],
            'creditsApply' => $row['credits_apply'],
        ]);
    } else {
        // 실패 응답
        echo json_encode(['success' => false, 'message' => '비밀번호가 일치하지 않습니다.']);
    }
} else {
    // 실패 응답
    echo json_encode(['success' => false, 'message' => '학번이 존재하지 않습니다.']);
}

$stmt->close();
$conn->close();
?>
