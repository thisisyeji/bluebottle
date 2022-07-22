const btnCall = document.querySelector(".btnCall");
const navMobile = document.querySelector(".nav_mobile");

btnCall.addEventListener("click", (e) => {
    e.preventDefault();

    btnCall.classList.toggle("on");
    navMobile.classList.toggle("on");
})