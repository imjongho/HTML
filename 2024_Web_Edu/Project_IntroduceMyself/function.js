// 페이지 상단으로 스크롤하는 함수
function moveToTop() {
    document.body.scrollIntoView({ behavior: "smooth" });
}


// 초기화 함수
function init() {
    window.alert("202001821 임종호의 자기소개 페이지"); // 페이지 로드 시 경고 메시지 표시

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

    drawBookCover();     // 캔버스 책 그리기

    // 포커스를 다른 요소로 이동시켜 주소 부분 선택 해제
    document.body.focus();
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


// 긴 문자열을 다루기 위해 템플릿 리터럴 사용
var answers = {
    // 공백 제외 957자
    topicAndGoal: `
    <p>대학교 MT에서 스마트팜을 견학할 기회가 있었는데 방울토마토 재배 구역을 보며 기술의 발전을 체감했습니다.
    많은 센서들이 있고 사물인터넷으로 기계들 간에 연결되어 센서가 작물의 상태를 감지하여 
    빅데이터를 참고해 인공지능이 판별하여 재배하거나 온도와 습도를 체크하여 물을 공급하는 등 자동화되었습니다.
    무섭게 변화하는 세상 속에서 변하지 않는 것은 농업의 중요성입니다. 
    농업은 1차 산업으로서 국가의 근본이며, 농협이 그 최전방에서 인간 생활에 필수적인 식량을 책임지는 농민과 농업을 지원하는 것이 매우 매력적으로 느껴졌습니다.
    </p>

    <p>저는 부모님의 밭일을 도우며 비료, 씨앗, 모종, 농약 등을 보았고 고구마, 고추, 들깨, 참깨 등을 수확해 보며 농업의 현실과 어려움을 직접 경험해보았습니다.
    수확까지의 일도 힘들었지만 수확 이후의 농작물 유통도 큰 문제였습니다. 
    저희는 소규모 농가라 지인들에게 판매하는 방법으로 해결했지만, 다른 농업인들의 경우 자체적으로 물류와 유통을 해결하기에는 어려움이 많을 것이라 생각되었습니다.
    이러한 경험을 통해 농산물이 소비자에게 안전하고 신선하게 전달되는 과정이 얼마나 중요한지 깨달았으며, 이 과정에서 농협의 역할이 매우 중요하다는 것을 인식하게 되었습니다.
    </p>
    
    <p>저는 농협의 경제사업 부문에서 업무를 수행하며 농업인의 소득 증대 및 삶의 질 향상에 함께하고자 지원했습니다. 
    방학기간 중, 알리와 쿠팡을 주로 받는 물류센터에서 아르바이트를 하며 상품의 배송과정을 보고 느꼈습니다.
    체계적으로 정립된 시스템과 바코드를 확인하는 공장 기계의 조화는 처리 속도를 비약적으로 증가시킨다는 사실을 말입니다. 
    그래서, '함께하는 100년 농협 비전 2025'에서 강조하는 디지털 혁신과 미래 성장 동력을 창출하는 목표에 공감하며
    입사 후에 배속받은 장소에서 시스템을 공부하고 빅데이터를 활용한 연관 분석, 분류, 클러스터링 기법을 통해 물품관리를 더욱 효율적으로 개선하고자 합니다.
    </p>

    <p>저는 농협의 비전과 목표에 공감하며, 국가적인 경쟁력과 지역사회 발전에 기여하고자 합니다. 농협이 추진하는 다양한 프로젝트와 도전 속에서 
    저의 기술과 경험을 접목시켜 함께 발전해 나갈 수 있는 기회가 되기를 바랍니다. 
    앞으로 농협이 미래 산업을 위해 다양한 도전을 할 때 저도 경제사업 부문에서 농협의 어떤 도전이든 적응하고 성취해낼 수 있는 진취적인 도전가, 
    최고의 전문가가 되어 함께하고 싶습니다.</p>
    `,
    
    // 공백 제외 936자
    growthProcess: `
    <p>새로운 세상에 발을 디디는 것은 두렵지 않습니다.
    중학생 시절 처음 소설을 접하면서 작가가 창조한 주인공을 이해하고 새로운 세계관에 적응하는 과정에서 큰 재미를 느꼈습니다. 
    특히, 판타지 소설을 많이 읽으면서 신기하고 창의적인 세계관들을 접하며 자라다 보니 새로운 것을 쉽게 받아들이고 거부감 없이 수용하는 자신의 모습을 볼 수 있었습니다. 
    판타지 소설의 터무니없는 설정과 이야기들을 자연스럽게 받아들였고 현실의 뉴스, 기사, 블로그 등을 편견없이 받아들였습니다.
    하지만 지식이 얕고 소심했던 저는 보고 들은 새롭고 유용한 정보를 활용할 생각도 못했습니다.
    해당 정보가 맞는지 틀린지 판단하지 못했고 어디에 어떻게 쓸지도 감을 못 잡았고 얼마나 편파적으로 해석되었는지도 구분하지 못했기 때문입니다.   
    그래서 4차 산업혁명이라는 단어가 뜨겁게 유행이기도 했고 새로운 지식들을 배우고 실제로 활용까지 해보자는 심정으로 컴퓨터공학부 소프트웨어전공으로 대학에 진학하여 기본기부터 차근차근 배웠습니다.</p>
    
    <p>하루종일 프로그래밍 언어로 코딩을 하면서 체계적으로 생각하여 기능을 구현하는 능력을 키웠고 
    알고리즘, 네트워크, 데이터베이스 등을 배우며 이론을 튼튼히 다져 더욱 완성도 있는 소프트웨어를 만들 수 있도록 훈련했습니다. 
    기본기는 식물의 뿌리와 같다고 생각합니다. 식물의 뿌리가 튼튼하고 질기게 땅 밑에 형성되어야 뽑지 못하고 쑥쑥 성장합니다. 
    뿌리를 내린 상태에서 식물이 땅 위로 성장해 꽃을 피우기 까지의 모든 과정이 프로젝트라고 생각합니다.
    저는 사진관 예약 앱 프로젝트를 진행하면서 근본인 AndroidStudio와 mySQL을 사용하고자 했는데, 인터넷을 찾아보니 FireBase를 사용하면 더 완성도 있고 좋은 결과물을 만들 수 있을 것 같았습니다. 
    저에게 있어 새로운 도전이었지만 두렵지 않았습니다. 데이터베이스 시간에 NoSQL의 개념을 배웠기 때문입니다. 이후 요구사항을 분석하여 유스케이스 다이어그램을 만들었고, 
    DB를 설계하여 릴레이션을 도출한 후 코드를 작성하여 기능과 UI를 구현하며 성공적으로 결과물을 만들었습니다.</p>
    
    <p>이처럼 저는 새로운 도전에 대한 두려움 없이 꾸준히 배우고 성장해왔습니다. 
    이러한 경험을 바탕으로 농협의 근본이 되는 정체성 교육을 받아 기본기를 다지며, 새로운 기술이나 체제를 두려움 없이 수용하는 태도로 
    4차 산업혁명 속 변화하는 농협에 조합원들과 함께 적응해 나가며 긍정적인 영향을 미칠 수 있는 인재가 되고자 합니다.<p>
    `,
    
    // 공백 제외 945자
    socialIssue: `
    <p>
    최근 몇 년 동안 기후 변화와 그에 따른 농업의 불안정성 문제는 전 세계적으로 중요한 사회적 이슈로 떠오르고 있습니다. 
    극단적인 날씨 변화와 자연 재해는 농작물 생산에 직접적인 영향을 미쳐 식량 공급의 불안정을 초래하고 있습니다. 
    이로 인해 지속 가능한 농업 기술의 발전과 스마트팜 도입이 더욱 절실해지고 있습니다.
    </p>

    <p>
    스마트팜은 IoT, 빅데이터, 인공지능(AI) 등을 활용하여 농업 생산성을 높이고 자원 사용을 최적화하는 기술입니다. 
    이러한 기술은 기후 변화로 인한 농업의 불안정성을 극복하는 데 중요한 역할을 하고 있습니다. 
    예를 들어, 스마트팜 기술을 통해 온도, 습도, 토양 상태 등을 실시간으로 모니터링하고, 이를 기반으로 최적의 재배 조건을 유지함으로써 농작물의 생산성을 높일 수 있습니다.
    지속 가능한 농업은 환경 친화적인 방법을 사용하여 농업 생산을 유지하고, 자원을 효율적으로 사용하며, 장기적인 농업 생산성을 보장하는 것을 목표로 합니다. 
    이는 화학 비료나 농약 사용을 줄이고, 유기농법을 도입함으로써 토양의 건강을 유지하고, 수질 오염을 줄이며, 기후 변화에 대응하는 데 도움이 됩니다.    
    자원의 효율적 사용 역시 중요한 요소입니다. 물, 토양, 에너지와 같은 자원을 최소한으로 사용하면서 최대한의 생산성을 얻는 것을 목표로 합니다. 
    예를 들어, 물 절약 기술, 적정 경작법, 재생 가능 에너지 사용 등을 포함합니다. 
    이러한 방법들은 현재 세대뿐만 아니라 미래 세대도 안정적으로 농업 자원을 사용할 수 있도록 보장합니다.
    </p>

    <p>
    장기적인 농업 생산성 보장은 단기적인 생산성만을 고려하지 않고, 토양 건강, 작물 다양성, 생태계 균형 등을 유지하여 장기적으로 안정적인 농업 생산을 보장합니다. 
    이는 지속적인 수확을 가능하게 하며, 농업 종사자의 생활 안정성도 도모합니다.
    저는 이러한 지속 가능한 농업과 스마트팜 도입이 농업의 미래를 위한 필수적인 발전 방향이라고 생각합니다. 
    기후 변화와 자원 고갈 문제를 해결하면서도 농업 생산을 유지하고자 하는 노력이 필요합니다. 
    이를 통해 현재와 미래 세대가 모두 농업 자원을 지속적으로 사용할 수 있도록 보장할 수 있습니다. 
    농업의 지속 가능성을 확보하는 것은 단순히 식량 생산의 문제를 넘어, 환경 보호와 경제적 안정성, 사회적 공정성을 함께 추구하는 중요한 과제라고 할 수 있습니다.
    이와 같은 기술 발전과 지속 가능한 농업을 통해 우리는 기후 변화와 같은 전 지구적 문제에 대응할 수 있으며, 더 나아가 농업의 생산성과 안정성을 높여 글로벌 식량 안보를 강화할 수 있을 것입니다.
    </p>
    `,
    
    projectDifficulty: `
    <p>
    사진관 예약 앱 프로젝트는 사용자가 다양한 사진관을 쉽게 예약할 수 있도록 설계되었습니다. 
    사용자는 사진관 장소 대여자와 방문 예약자로 나뉘며, 모든 사용자는 로그인/로그아웃, 사진관 선택, 사진관 검색, 
    내 정보 조회/수정, 참고 사진 조회, 예약 정보 조회, 예약 취소, 전체 일정 조회 기능을 이용할 수 있습니다. 
    예약 가능 시간을 확인하고 중복 예약을 방지하며, 간단명료한 사용자 인터페이스(UI)를 통해 예약 정보를 쉽게 입력하고 확인할 수 있도록 하였습니다.
    </p>

    <p>
    이 프로젝트에서 가장 어려웠던 부분은 FireBase를 데이터베이스로 사용하는 점이었습니다. 
    FireBase는 NoSQL 데이터베이스로, SQL 기반의 전통적인 관계형 데이터베이스와는 다른 구조와 쿼리 방식을 사용합니다. 
    처음 FireBase를 접했을 때, SQL에 익숙했던 저에게 데이터 구조를 설계하고 쿼리하는 방식이 낯설었습니다. 
    특히, 실시간 예약 기능을 구현하는 과정에서 예약 시간대가 중복되지 않도록 실시간으로 데이터를 업데이트하고 조회해야 했기 때문에, 
    FireBase의 실시간 데이터베이스 기능을 활용하는 데 많은 어려움이 있었습니다.
    </p>

    <p>
    예를 들어, 예약 시간을 데이터베이스에 저장할 때, 시간 형식을 통일하는 것이 큰 문제였습니다. 이를 해결하기 위해 HH형식의 24시간 표기법을 사용하여 시간을 저장하기로 결정하였고, 
    FireBase의 트랜잭션 기능을 활용해 예약 시점에서 데이터베이스를 잠그고 예약이 완료되면 잠금을 해제하는 방식으로 동시성 문제를 해결했습니다. 
    FireBase의 공식 문서와 다양한 온라인 자료를 참고하여 학습하고, 소규모 테스트 프로젝트를 통해 기능을 실험한 결과, 실시간 예약 기능을 성공적으로 구현할 수 있었습니다. 
    이러한 경험은 새로운 기술을 학습하고 적용하는 능력을 크게 향상시켰으며, 향후 새로운 기술을 도입하고 문제를 해결하는 데 큰 도움이 될 것입니다.
    </p>
    `,
    
    personalAbility: `
    Skill과 Portfolio를 참고해주세요.
    `
};


function drawBookCover() {
    var canvas = document.getElementById('bookCanvas');
    var ctx = canvas.getContext('2d');
    var bookSelect = document.getElementById('bookSelect');
    var selectedBook = bookSelect.value;
    var img = new Image();

    img.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 초기화
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // 이미지를 캔버스 크기에 맞추어 그리기
    };

    // 이미지 경로를 실제 경로로 변경
    if (selectedBook === 'book1') {
        img.src = 'media/book1.jpg';
    } else if (selectedBook === 'book2') {
        img.src = 'media/book2.jpg';
    } else if (selectedBook === 'book3') {
        img.src = 'media/book3.jpg';
    }
}


window.onload = function() {
    init();
};