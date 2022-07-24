const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const slider = document.querySelector(".img_slider");
const ul = slider.querySelector("ul");
let winWid = window.innerWidth;
let left = parseFloat(getComputedStyle(ul).left);
let per = (left / winWid) * 100;

ul.style.left = per + "%";

console.log(per);


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