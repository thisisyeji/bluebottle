const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const slider = document.querySelector(".slider");
const ul = slider.querySelector("ul");

ul.style.left = "-100%"
ul.prepend(ul.lastElementChild);


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
        value: "-200%",
        duration: 1000,
        callback: () => {
            ul.append(ul.firstElementChild);
            ul.style.left = "-100%"
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
            ul.style.left = "-100%"
        }
    })
}