//상수 선언
const addBox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
const closeIcon = popupBox.querySelector("header i");
const nameTag = popupBox.querySelector("#name");
const titleTag = popupBox.querySelector("#title");
const descTag = popupBox.querySelector("textarea");
const addBtn = popupBox.querySelector("button");

const months = [
  // 월이름 배열만들기
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
//getting localstorage notes if exist and parsing them
//to js object else passing an empty array to notes
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
console.log(notes);

//show 클래스 줘서 popup창 열기,닫기
addBox.addEventListener("click", () => {
  popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
  popupBox.classList.remove("show");
});

function showNotes() {
  notes.forEach((note) => {
    let liTag = `<li class="note">
                  <div class="details">
                    <p>${note.name}</p>
                    <p>${note.title}</p>
                    <span>${note.descriotion}</span>
                  </div>
                  <div class="bottom-content">
                    <span>April 3, 2022</span>
                    <div class="settings">
                      <i class="uil uil-ellipsis-h"></i>
                      <ul class="menu">
                        <li><i class="uil uil-pen"></i>Edit</li>
                        <li><i class="uil uil-trash"></i>Delete</li>
                      </ul>
                    </div>
                  </div>
                </li>`;
    addBox.insertAdjacentHTML("afterend", liTag);
  });
}
showNotes();
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  //이름,제목,내용 입력값 받아오면서 변수 만들기
  let noteName = nameTag.value;
  let noteTitle = titleTag.value;
  let noteDesc = descTag.value;

  if (noteName || noteTitle || noteDesc) {
    let dateObj = new Date(); //현재 시간 생성
    // 년,월,일 빼오기
    let year = dateObj.getFullYear();
    let month = dateObj.getMonth();
    let day = dateObj.getDate();

    let noteInfo = {
      //객체 생성해서 아래쪽에 배열로 만듬
      name: noteName,
      title: noteTitle,
      descriotion: noteDesc,

      date: `${year}년,${month}월,${day}일`,
    };
    notes.push(noteInfo);
    // notes 로컬스토리지에 저장
    //관리자창에 로컬스토리지 가보면 object저장되있어서
    //stringify 문자열로 변환해야됨
    localStorage.setItem("Key", JSON.stringify(notes));

    closeIcon.click(); //등록버튼에 closeIcon클릭효과 넣음
  }
});
