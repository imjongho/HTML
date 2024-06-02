<?php
// 데이터베이스 연결 정보
$host = 'localhost';
$user = 'root';
$password = 'jongho4502@';
$dbname = 'course_registration';

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("연결 실패: " . $conn->connect_error);
}

// POST 요청으로부터 학번(studentId)과 과목번호(subjectCode)를 가져옵니다.
$studentId = isset($_POST['studentId']) ? $_POST['studentId'] : '';
$subjectCode = isset($_POST['subjectCode']) ? $_POST['subjectCode'] : '';

// 학번과 과목번호가 일치하는 수강신청 정보를 데이터베이스에서 삭제
$sql = "DELETE FROM registration_info WHERE student_id = ? AND subject_code = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $studentId, $subjectCode);
$stmt->execute();

// 삭제 결과에 따라 응답 전송
if ($stmt->affected_rows > 0) {
    echo "수강취소 성공";
} else {
    echo "수강취소 실패";
}

$stmt->close();
$conn->close();
?>
