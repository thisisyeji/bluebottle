setCount();

setInterval(function () {
    setCount();
}, 10000);

function setCount() {
    counter(".countries", 500);
    counter(".cities", 1000);
    counter(".cafes", 2000);
    counter(".employees", 3000);
}

function counter(el, time) {
    const item = document.querySelector(el);
    let num = 0;
    let target = item.innerText
    let interval = time / target;

    let timer = setInterval(function () {
        num++;

        if (num == target) {
            clearInterval(timer);
        }

        item.innerText = num;
    }, interval)
}

