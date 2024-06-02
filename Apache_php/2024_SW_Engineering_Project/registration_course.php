<?php
$host = 'localhost';
$user = 'root';
$password = 'jongho4502@';
$dbname = 'course_registration';

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("연결 실패: " . $conn->connect_error);
}

// POST 요청으로부터 학번(studentId)을 가져옵니다.
$studentId = isset($_POST['studentId']) ? $_POST['studentId'] : '';

//조인
$sql = "SELECT ri.*, s.subject_code, s.course_classification, s.class, s.subject_name, s.grades, s.professor, s.target_grade, s.schedule, s.classroom, s.opening_departments
FROM registration_info ri
JOIN subject s ON ri.subject_code = s.subject_code
WHERE ri.student_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $studentId);
$stmt->execute();
$result = $stmt->get_result();
$registrations = $result->fetch_all(MYSQLI_ASSOC);

$index = 1;
foreach ($registrations as $registration) {
    echo "<tr>
            <td>{$index}</td>
            <td><button type='button' class='cancel' onclick='cancelCourse(\"{$registration['subject_code']}\")'>수강취소</button></td>
            <td>{$registration['subject_code']}</td>
            <td>{$registration['subject_name']}</td>
            <td>{$registration['course_classification']}</td>
            <td>{$registration['class']}</td>
            <td>{$registration['grades']}</td>
            <td>{$registration['professor']}</td>
            <td>{$registration['target_grade']}</td>
            <td>{$registration['schedule']}</td>
            <td>{$registration['classroom']}</td>
            <td>{$registration['opening_departments']}</td>
          </tr>";
    $index++;
}

$stmt->close();
$conn->close();
?>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        // 페이지가 로드될 때마다 자동으로 업데이트 테이블 함수 호출
        updateRegistrationTable();
    });
</script>