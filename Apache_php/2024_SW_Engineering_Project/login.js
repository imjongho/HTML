document.addEventListener('DOMContentLoaded', function() {
    // 로그인 폼 이벤트 리스너 추가
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // 폼 기본 제출 동작 방지

        // FormData 객체 생성
        const formData = new FormData();
        formData.append('student_id', document.getElementById('student_id').value);
        formData.append('password', document.getElementById('password').value);

        // 서버에 로그인 요청 보내기 (FormData 사용)
        fetch('login.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json()) // 응답을 JSON 형태로 파싱
        .then(data => {
            if (data.success) { // 로그인 성공
                loginSuccess(data); // 로컬 스토리지에 정보 저장 및 후속 처리
            } else {
                alert('로그인 실패: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});

function loginSuccess(responseData) {
    // 로그인 성공 후 서버로부터 받은 데이터로 로컬 스토리지에 정보 저장
    localStorage.setItem('studentId', responseData.studentId);
    localStorage.setItem('schoolYear', responseData.schoolYear);
    localStorage.setItem('semester', responseData.semester);
    localStorage.setItem('creditsApply', responseData.creditsApply);

    // 로그인 성공 처리, 예: 메인 페이지로 리디렉션
    window.location.href = 'course_registration.html';
}