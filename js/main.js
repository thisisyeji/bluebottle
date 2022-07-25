const btnCall = document.querySelector(".btnCall");
const navMobile = document.querySelector(".nav_mobile");

btnCall.addEventListener("click", (e) => {
    e.preventDefault();

    btnCall.classList.toggle("on");
    navMobile.classList.toggle("on");

    const callOn = btnCall.classList.contains("on");
    if (callOn) {
        btnCall.style.position = "fixed";
        btnCall.style.top = "40px";
    } else {
        btnCall.style.position = "absolute";
    }
})