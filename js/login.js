// 로그인 버튼--------------------------------------------------
const login = document.querySelector(".login");
const loginPage1 = document.querySelector(".loginPage1");
const loginPage2 = document.querySelector(".loginPage2");
const btn1 = document.querySelector(".button1");
const btn2 = document.querySelector(".button2");
const btns1 = document.querySelector(".sbutton1");
const btns2 = document.querySelector(".sbutton2");

login.addEventListener("click", function () {
    if ((loginPage2.style.display = "none")) {
        loginPage2.style.display = "block";
        loginPage1.style.display = "none";
    }
});

btn2.addEventListener("click", function () {
    if (loginPage2.style.display === "block") {
        loginPage2.style.display = "none";
        loginPage1.style.display = "block";
    }
});

btns1.addEventListener("click", function () {
    if (loginPage1.style.display === "block") {
        loginPage1.style.display = "none";
        loginPage2.style.display = "block";
    }
});

// 로그인 버튼 끝-----------------------------------------------------------

// x마크 ------------------------------------------------------------------------------------

const xmark1 = document.querySelector(".sXmark");
const xmark2 = document.querySelector(".lXmark");

xmark2.addEventListener("click", function () {
    loginPage2.style.display = "none";
});

xmark1.addEventListener("click", function () {
    loginPage1.style.display = "none";
});

// x마크 끝------------------------------------------------------------------------------------

// 로그인 페이지 유효성 검사 ----------------------------------------------------------------

const us = document.getElementById("us");
const uswers = document.querySelector(".uswers");
// console.log(us)
const pw = document.getElementById("pw");
const pwd = document.querySelector(".pwd");
const div = document.createElement("div");

function er() {
    btn1.addEventListener("click", function () {
        if (us.value === "") {
            alert("아이디를 입력하세요.");
            us.focus();
            return;
        } else if (pw.value === "") {
            alert("비밀번호를 입력하세요.");
            pw.focus();
            return;
        }
    });
}
er();

us.addEventListener("keydown", function () {
    if (us.value === "") {
        uswers.append(div);
        div.innerText = "@아이디가 정확하지 않습니다.";
        div.style.color = "red";
    }
});

pw.addEventListener("keydown", function () {
    if (pw.value === "") {
        pwd.append(div);
        div.innerText = "@비밀번호가 정확하지 않습니다.";
        div.style.color = "red";
    }
});

// 로그인 페이지 유효성 검사 끝 ----------------------------------------------------------------
