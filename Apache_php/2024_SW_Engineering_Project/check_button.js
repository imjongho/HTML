document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // 폼의 기본 제출 동작을 막음

        // FormData 객체를 사용하여 폼 데이터를 준비함
        const formData = new FormData(this);

        // fetch 함수를 사용하여 폼 데이터를 'check_course.php'로 비동기적으로 전송함
        fetch('check_course.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text()) // 응답을 텍스트로 변환
        .then(data => {
            // 서버로부터 받은 HTML 응답으로 tbody의 내용을 업데이트함
            document.querySelector('#scroll-table1 tbody').innerHTML = data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});