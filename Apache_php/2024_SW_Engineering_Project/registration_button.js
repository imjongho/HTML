// localStorage에 저장된 학번을 가져오는 함수
function getStudentId() {
    return localStorage.getItem('studentId');
}


function registerCourse(subjectCode) {
    const studentId = getStudentId(); // 로그인된 사용자의 학번 가져오기
    const enrollmentDate = new Date().toISOString().slice(0, 19).replace('T', ' '); // 현재 날짜 및 시간

    const formData = new FormData();
    formData.append('studentId', studentId); // 학번 추가
    formData.append('subjectCode', subjectCode); // 과목 코드 추가
    formData.append('enrollmentDate', enrollmentDate); // 수강신청 날짜 및 시간 추가

    fetch('registration.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        if (data.includes("수강신청 성공")) {
            alert('수강신청이 완료되었습니다.');
            updateRegistrationTable(); // 수강신청 내역 업데이트
        } else {
            alert('수강신청에 실패했습니다. 서버 응답: ' + data);
        }
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}



function updateRegistrationTable() {
    const studentId = getStudentId();
    // 서버에 학번을 전송하여 수강신청 내역 업데이트 요청 보내기
    const formData = new FormData();
    formData.append('studentId', studentId);

    fetch('registration_course.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text()) // 응답을 텍스트(HTML)로 변환
    .then(html => {
        const tbody = document.querySelector('#scroll-table2 tbody');
        tbody.innerHTML = html; // 서버로부터 받은 HTML로 tbody 내용 업데이트
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
