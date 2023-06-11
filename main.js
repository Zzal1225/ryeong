const slideWrapper = document.querySelector(".slidewrapper"),
  slideContainer = slideWrapper.querySelector(".slide_container"),
  slides = slideContainer.querySelectorAll(".slide"),
  slideCount = slides.length,
  slideBtns = slideWrapper.querySelectorAll(".controls a");

let currentIdx = 0;

//슬라이드 배치
let resizeEvt = new Event("resize");

window.addEventListener("resize", () => {
  slideContainer.style.width = `${window.innerWidth * slideCount}px`;
});

window.dispatchEvent(resizeEvt);

//슬라이드 이동 함수
function moveSlide(num) {
  slideContainer.style.transform = `translateX(${-num * window.innerWidth}px)`;
  currentIdx = num;
  console.log(currentIdx);
}
//이전, 다음 버튼 기능
for (btn of slideBtns) {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("prev")) {
      /*마지막이 아니면 현재슬라이드번호에서 -1한 값을 moveSlide에 전달, 마지막이면 처음으로*/
      moveSlide((slideCount + currentIdx - 1) % slideCount);
    } else {
      /*처음이 아니면 현재슬라이드번호에서 +1한 값을 moveSlide에 전달, 처음이면 마지막으로*/
      moveSlide((currentIdx + 1) % slideCount);
    }
  });
}

//본문 바로가기(quick_link)
const skipToContent = document.querySelector(".quick_link");
const mainContent = document.querySelector("#main_content");

/*skipToContent를 클릭하면(링크의 기본 속성은 막고) 윈도우에 스크롤을 생성한다.
스크롤양은 mainContent가 화면 상단에서 떨어진 거리를
변수명 mainContentOST에 담아서 활용*/
skipToContent.addEventListener("click", (e) => {
  e.preventDefault();
  let mainContentOST = mainContent.offsetTop;
  window.scrollTo({ left: 0, top: mainContentOST, behavior: "smooth" });
});

// 필터기능 disney_plus //

let filterBtns = document.querySelectorAll(".disney_plus .buttons button"),
  disneyList = document.querySelectorAll(".disney_plus ul li");

for (let dl of disneyList) {
  dl.classList.add("active");
}

/* filterBtns를 클릭하면 모든 filterBtns에서 active를 제거하고 클릭한 그 요소에만 active 클래스명 추가!
변수명 targetClass에 클릭한 그 요소의 속성 중 data-filter의 값을 저장.
disneyList의 모든 항목을 보이지 않도록 한다.
targetClass의 클래스명이 있는 요소만 변수명 filteredList에 담고 그 리스트들이 보이게 한다.*/

for (let fb of filterBtns) {
  fb.addEventListener("click", (e) => {
    for (let btn of filterBtns) {
      btn.classList.remove("active");
    }
    e.target.classList.add("active");

    let targetClass = e.target.getAttribute("data-filter");
    let filteredList = document.querySelectorAll(
      `.disney_plus ul .${targetClass}`
    );

    if (targetClass === "all") {
      for (let dl of disneyList) {
        dl.classList.add("active");
      }
    } else {
      for (let dl of disneyList) {
        dl.classList.remove("active");
      }
      setTimeout(() => {
        for (let fl of filteredList) {
          fl.classList.add("active");
        }
      }, 100);
    }
  }); //버튼클릭
}
