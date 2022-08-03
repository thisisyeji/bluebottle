const popup = document.querySelector("#popup");
const btnClose = document.querySelector(".pop_close");

//쿠키확인 document.cookie
//document.cookie = "쿠키이름=쿠키값" path="/" expires="만료시간";

//쿠키 찾기
const isCookie = document.cookie.indexOf("popup=done");
// console.log(isCookie);

if (isCookie == -1) {
    console.log("쿠키없음");
    popup.style.display = "block";
} else {
    console.log("쿠키있음");
    popup.style.display = "none";
}


btnClose.addEventListener("click", (e) => {
    e.preventDefault;

    const isChecked = popup.querySelector("input[type=checkbox]").checked;
    if (isChecked) setCookie("popup", "done", "1");

    popup.style.display = "none";
})

function setCookie(cookiename, cookievalue, time) {
    const today = new Date();
    const date = today.getDate();
    today.setDate(date + time);
    const dueDate = today.toGMTString();

    document.cookie = `${cookiename}=${cookievalue} path = "/" expires = ${dueDate}`;
}