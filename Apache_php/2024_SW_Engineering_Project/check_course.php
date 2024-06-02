<?php
    // 데이터베이스 연결 정보
    $host = 'localhost';
    $user = 'root';
    $password = 'jongho4502@'; // 실제 사용 시 보안을 위해 변경하세요.
    $dbname = 'course_registration';

    // MySQLi 객체 지향 방식으로 연결
    $conn = new mysqli($host, $user, $password, $dbname);

    // 연결 오류 확인
    if ($conn->connect_error) {
        die("연결 실패: " . $conn->connect_error);
    }

    /* 기본 POST 받기
    // POST 데이터 받기
    $course_Classification = $_POST['courseClassification'];
    $university = $_POST['university'];
    $opening_departments = $_POST['department'];
    $target_grade = $_POST['target_grade'];

    // 쿼리 실행
    $sql = "SELECT * FROM subject WHERE course_classification='$course_Classification' OR university='$university' OR opening_departments='$opening_departments' OR target_grade='$target_grade'";
    $result = $conn->query($sql);
    */

    // 조건 문자열 배열 초기화
    $conditions = [];

    // POST 데이터 받기 및 조건 추가
    if (!empty($_POST['courseClassification']) && $_POST['courseClassification'] !== '선택') {
        $course_Classification = $conn->real_escape_string($_POST['courseClassification']);
        $conditions[] = "course_classification='$course_Classification'";
    }
    if (!empty($_POST['university']) && $_POST['university'] !== '선택') {
        $university = $conn->real_escape_string($_POST['university']);
        $conditions[] = "university='$university'";
    }
    if (!empty($_POST['department']) && $_POST['department'] !== '선택') {
        $department = $conn->real_escape_string($_POST['department']);
        $conditions[] = "opening_departments='$department'";
    }
    if (!empty($_POST['target_grade']) && $_POST['target_grade'] !== '선택') {
        $target_grade = $conn->real_escape_string($_POST['target_grade']);
        $conditions[] = "target_grade='$target_grade'";
    }

    // 조건 배열을 기반으로 SQL WHERE 절 생성
    $sql = "SELECT * FROM subject";
    if (!empty($conditions)) {
        $sql .= " WHERE " . implode(' AND ', $conditions);
    }

    $result = $conn->query($sql);

    // 결과 행 출력
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            echo "<tr>
                    <td><button type='button' class='register' onclick='registerCourse(\"{$row['subject_code']}\")'>수강신청</button></td>
                    <td>{$row['subject_code']}</td>
                    <td>{$row['course_classification']}</td>
                    <td>{$row['class']}</td>
                    <td>{$row['subject_name']}</td>
                    <td>{$row['grades']}</td>
                    <td>{$row['professor']}</td>
                    <td>{$row['target_grade']}</td>
                    <td>{$row['people_limit']}</td>
                    <td>{$row['schedule']}</td>
                    <td>{$row['classroom']}</td>
                    <td>{$row['opening_departments']}</td>
                  </tr>";
        }
    } else {
        echo "<tr><td colspan='12'>조회 결과: 해당 과목은 없습니다.</td></tr>";
    }

    // 데이터베이스 연결 종료
    $conn->close();
?>