<?php
    // 데이터베이스 연결 정보
    $host = 'localhost';
    $user = 'root';
    $password = 'jongho4502@';
    $dbname = 'course_registration';

    // MySQLi 객체 지향 방식으로 연결
    $conn = new mysqli($host, $user, $password, $dbname);

    // 연결 오류 확인
    if ($conn->connect_error) {
        die("연결 실패: " . $conn->connect_error);
    }

    // 쿼리 실행
    $sql = "SELECT * FROM subject"; // 개설 과목 정보를 담고 있는 테이블 이름
    $result = $conn->query($sql);

    // 결과 행 출력
    // 수강신청 버튼을 클릭했을 때 registerCourse 함수가 과목 코드를 매개변수로 받아서 처리
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
        echo "<tr><td colspan='12'>개설된 과목이 없습니다.</td></tr>";
    }

    // 데이터베이스 연결 종료
    $conn->close();
?>