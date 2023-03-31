"use strict"; //엄격하게 js로 선언

//기능// 생성,삭제,수정

//상수 선언
const addBox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
const popupTitle = popupBox.querySelector("header p");
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
//존재하는 경우 localstorage 메모를 가져오고 js 객체로 구문 분석하고 그렇지 않으면 메모에 빈 배열을 전달함
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
//글 수정하고 등록시 복제 되는 것 막기
let isUpdate = false,
    updateId;

//show 클래스 줘서 popup창 열기,닫기
addBox.addEventListener("click", () => {
    nameTag.focus();
    popupBox.classList.add("show");
});
//show 클래스 줘서 popup창 열기,닫기
closeIcon.addEventListener("click", () => {
    isUpdate = false;
    //closeIcon 클릭 후 작성 글자 초기화
    nameTag.value = "";
    titleTag.value = "";
    descTag.value = "";
    addBtn.innerText = "등록";
    popupTitle.innerHTML = "문의 남겨주세요";
    popupBox.classList.remove("show");
});

function showNotes() {
    document.querySelectorAll(".note").forEach((note) => note.remove()); //새 note 추가하기 전에 이전 note 모두 제거//복제오류방지
    notes.forEach((note, index) => {
        let liTag = `<li class="note">
                  <div class="details">
                    <p>${note.name}</p>
                    <p>${note.title}</p>
                    <span>${note.descriotion}</span>
                  </div>
                  <div class="bottom-content">
                    <span>${note.date}</span>
                    <div class="settings">
                      <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                      <ul class="menu">
                        <li onclick="updateNote(${index},'${note.name}','${note.title}','${note.descriotion}')"><i class="uil uil-pen"></i>Edit</li>
                        <li onclick="deleteNote(${index})"><i class="uil uil-trash"></i>Delete</li>
                      </ul>
                    </div>
                  </div>
                </li>`;
        addBox.insertAdjacentHTML("afterend", liTag); //(position, text)
    });
}
showNotes();
//settings박스---------------v------------------
function showMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", (e) => {
        //아무곳 클릭 시 설정 메뉴에서 쇼 클래스 제거/닫힘
        if (e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show");
        }
    });
}

function deleteNote(noteId) {
    let confirmDel = confirm("이 글을 삭제하시겠습니까");
    if (!confirmDel) return;
    notes.splice(noteId, 1); //array/tasks에서 선택한 메모 제거
    //stringify 문자열로 변환해야됨
    localStorage.setItem("notes", JSON.stringify(notes)); //업데이트된 메모를 localstorage에 저장
    showNotes();
}

function updateNote(noteId, name, title, desc) {
    isUpdate = true;
    updateId = noteId;
    addBox.click();
    nameTag.value = name;
    titleTag.value = title;
    descTag.value = desc;
    addBtn.innerText = "업데이트";
    popupTitle.innerHTML = "게시글 수정";
    console.log(noteId, name, title, desc);
}

//colorList담을 배열 생성
let colorList = [];

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
            date: `${year}년 ${month}월 ${day}일`,
        };
        if (!isUpdate) {
            notes.push(noteInfo); //note에 새로운 note 추가
        } else {
            isUpdate = false;
            notes[updateId] = noteInfo; //지정된 메모 업데이트
        }
        // notes 로컬스토리지에 저장 로컬스토리지에 object저장되있어서
        //stringify 문자열로 변환해야됨
        localStorage.setItem("notes", JSON.stringify(notes));

        closeIcon.click(); //등록버튼에 closeIcon클릭효과 넣음
        showNotes();
    }

    // 클릭하는 순간 컬러값이 변하기 때문에 클릭했을 때마다 컬러 값을 밖에 colorList배열변수를 만들어 변하지 않게 저장한다.
    let note = document.querySelectorAll(".note");
    let colorCode = "#" + Math.round(Math.random() * 0xffffff).toString(16);

    // 1. colorList에 unshift를 활용해 배열 맨 앞쪽으로 값을 추가. 클릭을 할 때마다 새로 추가된 note만 컬러 랜덤되고 뒤로 밀림
    // colorList.push(colorCode);
    colorList.unshift(colorCode);

    // 2. 배열변수인 colorList안의 컬러값들을 차례로 가져온 뒤, 메모를 나타내는 random변수도 차례로 가져와 같은 순서대로 넣는다.
    // ex) for문을 활용 : random[1]에 colorList[1]값을 넣는다. / random[2]에 colorList[2]값 / random[3]에 colorList[3]값....
    for (let i in colorList) {
        // note[i].style.backgroundColor = `${colorList[i]}`;
        note[i].style.backgroundColor = colorList[i];
        console.log(i);
    }
});
//==================뱅기
const character = document.querySelector(".character");
const character1 = document.querySelector(".character1");

let degree = 0;
loop();

function loop() {
    const rotation = (degree * Math.PI) / +500;
    const targetX = window.innerWidth / 3 + 80 * Math.cos(rotation) + 10;
    const targetY = window.innerHeight / 3 + 50 * Math.sin(rotation) - 10;

    const targetZ = window.innerHeight / 4 + 80 * Math.tan(rotation) - 10;
    character.style.left = `${targetX}px`;
    character.style.top = `${targetY}px`;
    character.style.top = `${targetZ}px`;

    character1.style.top = `${targetX}px`;
    character1.style.left = `${targetY}px`;
    character1.style.top = `${targetZ}px`;

    degree -= 1;

    requestAnimationFrame(loop);
}
//===================뱅기
