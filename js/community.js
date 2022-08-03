/*
const community = document.querySelector(".community");
const btns = community.querySelectorAll(".btns li");
const boxes = community.querySelectorAll("article>div");
const title = community.querySelector("h2");

btns.forEach((el, index) => {
    el.addEventListener("click", e => {
        e.preventDefault();
        activation(btns, index);
        activation(boxes, index);

        title.innerText = e.target.innerText;
    })
})

function activation(arr, index) {
    for (let el of arr) {
        el.classList.remove("on");
    }
    arr[index].classList.add("on");
}
*/


//class 
window.addEventListener("load", () => {
    new Tab(".community");
});


class Tab {
    constructor(el) {
        this.community = document.querySelector(el);
        this.btns = this.community.querySelectorAll(".btns li");
        this.boxes = this.community.querySelectorAll("article>div");
        this.title = this.community.querySelector("h2");


        this.btns.forEach((el, index) => {
            el.addEventListener("click", e => {
                e.preventDefault();

                this.activation(this.btns, index);
                this.activation(this.boxes, index);

                this.title.innerText = e.target.innerText;
            })
        })
    }
    activation = function (arr, index) {
        for (let el of arr) {
            el.classList.remove("on");
        }
        arr[index].classList.add("on");
    }
}
