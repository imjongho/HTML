// 수강취소 버튼을 클릭했을 때 호출되는 함수
function cancelCourse(subjectCode) {
    const studentId = getStudentId(); // 로컬 스토리지에서 학번 가져오기

    // 학번과 과목코드를 서버로 전송하여 수강취소 요청 보내기
    const formData = new FormData();
    formData.append('studentId', studentId); // 학번 추가
    formData.append('subjectCode', subjectCode); // 과목코드 추가

    fetch('cancel_course.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        if (data.includes("수강취소 성공")) {
            alert('수강취소가 완료되었습니다.');
            updateRegistrationTable(); // 수강신청 내역 업데이트
        } else {
            alert('수강취소에 실패했습니다. 서버 응답: ' + data);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}