const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const slider = document.querySelector(".img_slider");
const ul = slider.querySelector("ul");
const lis = ul.querySelectorAll("li");

let liWid = 0;
let wid = 0;
let per = 0;

getWid();

window.addEventListener("resize", () => {
    getWid();

})

function getWid() {
    wid = parseFloat(getComputedStyle(slider).width);
    liWid = parseFloat(getComputedStyle(lis[0]).width);
    per = Math.ceil(-(liWid / wid) * 100);

    ul.style.left = per + "%";
}


next.addEventListener("click", (e) => {
    e.preventDefault();
    nextSlide();
})

prev.addEventListener("click", (e) => {
    e.preventDefault();
    prevSlide();
})

function nextSlide() {
    new Anime(ul, {
        prop: "left",
        value: per * 2 + "%",
        duration: 1000,
        callback: () => {
            ul.append(ul.firstElementChild);
            ul.style.left = per + "%"
        }
    })
}

function prevSlide() {
    new Anime(ul, {
        prop: "left",
        value: "0%",
        duration: 1000,
        callback: () => {
            ul.prepend(ul.lastElementChild);
            ul.style.left = per + "%"
        }
    })
}