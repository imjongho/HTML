// 페이지 상단으로 스크롤하는 함수
function moveToTop() {
    document.body.scrollIntoView({ behavior: "smooth" });
}


// 초기화 함수
function init() {
    var imgIndex = 0; // 현재 이미지 인덱스
    var position = 0; // 슬라이드 위치
    var IMG_WIDTH = 300; // 이미지 너비
    var btnPrev = document.getElementById("btn-prev"); // 이전 버튼
    var btnNext = document.getElementById("btn-next"); // 다음 버튼
    var slideImgs = document.getElementById("slide-images"); // 슬라이드 이미지 컨테이너
    var totalImgs = slideImgs.children.length; // 총 이미지 수

    // 이전 버튼 클릭 시 동작하는 함수
    function prev() {
        imgIndex = (imgIndex - 1 + totalImgs) % totalImgs; // 순환
        position = -IMG_WIDTH * imgIndex;
        slideImgs.style.transform = `translateX(${position}px)`; // 슬라이드 이동
    }

    // 다음 버튼 클릭 시 동작하는 함수
    function next() {
        imgIndex = (imgIndex + 1) % totalImgs; // 순환
        position = -IMG_WIDTH * imgIndex;
        slideImgs.style.transform = `translateX(${position}px)`; // 슬라이드 이동
    }

    btnPrev.addEventListener("click", prev); // 이전 버튼에 이벤트 리스너 추가
    btnNext.addEventListener("click", next); // 다음 버튼에 이벤트 리스너 추가
}


// 답변을 추가하거나 제거하는 함수
function toggleAnswer(obj, text) {
    var parent = obj.parentElement; // 클릭된 버튼의 부모 요소
    var answers = parent.getElementsByTagName('p'); // 부모 요소의 모든 <p> 요소 가져오기

    // 이미 추가된 답변이 있는지 확인
    var existingP = null;
    for (var i = 0; i < answers.length; i++) {
        if (answers[i].className === 'answer') {
            existingP = answers[i];
            break;
        }
    }

    // 기존 답변이 있으면 제거하고 버튼 텍스트 변경
    if (existingP) {
        parent.removeChild(existingP);
        obj.innerText = "답변 보기";
    } 
    // 기존 답변이 없으면 새로운 답변 추가하고 버튼 텍스트 변경
    else {
        var newP = document.createElement("p");
        newP.className = 'answer'; // 답변 <p> 요소에 'answer' 클래스 추가
        newP.innerHTML = text;
        parent.appendChild(newP);
        obj.innerText = "답변 닫기";
    }
}
