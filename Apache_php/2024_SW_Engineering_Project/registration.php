<?php
$host = 'localhost';
$user = 'root';
$password = 'jongho4502@';
$dbname = 'course_registration';

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("연결 실패: " . $conn->connect_error);
}

// POST 방식으로 전송된 데이터를 받아옴
$studentId = $_POST['studentId']; // 학번
$subjectCode = $_POST['subjectCode']; // 과목번호
$enrollmentDate = $_POST['enrollmentDate']; // 수강신청일자

// 학번과 과목번호가 존재하는지 확인
$studentExistsQuery = "SELECT 1 FROM student WHERE student_id = ?";
$subjectExistsQuery = "SELECT 1 FROM subject WHERE subject_code = ?";

// 학생 확인
$stmt = $conn->prepare($studentExistsQuery);
$stmt->bind_param("s", $studentId);
$stmt->execute();
$studentResult = $stmt->get_result();
$studentExists = $studentResult->num_rows > 0;

// 과목 확인
$stmt = $conn->prepare($subjectExistsQuery);
$stmt->bind_param("s", $subjectCode);
$stmt->execute();
$subjectResult = $stmt->get_result();
$subjectExists = $subjectResult->num_rows > 0;

// 두 값 모두 존재하는 경우에만 수강신청 정보 삽입(FK가 있어서)
if ($studentExists && $subjectExists) {
    $sql = "INSERT INTO registration_info (student_id, subject_code, registration_date) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $studentId, $subjectCode, $enrollmentDate);

    if ($stmt->execute()) {
        echo "수강신청 성공";
    } else {
        echo "수강신청 실패: " . $stmt->error;
    }
} else {
    if (!$studentExists) {
        echo "학번이 존재하지 않습니다.";
    }
    if (!$subjectExists) {
        echo "과목번호가 존재하지 않습니다.";
    }
}

$stmt->close();
$conn->close();
?>
