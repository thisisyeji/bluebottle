/*
이미지
https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg

Buddyicons
http://farm{icon-farm}.staticflickr.com/{icon-server}/buddyicons/{nsid}.jpg
대체아이콘
https://www.flickr.com/images/buddyicon.gif

데이터 요청 url (REST Request Format)
https://www.flickr.com/services/rest/?method=flickr.test.echo&name=value
*/

const frame = document.querySelector(".frame");
const loading = document.querySelector(".loading");

const base = "https://www.flickr.com/services/rest/?";
const method_favs = "flickr.favorites.getList";
const key = "ca6bb9623cb117b2c44bd339126530e9";
const user_id = "196138805@N05";
const per_page = 200;
const url_favs = `${base}method=${method_favs}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&user_id=${user_id}`;


callData(url_favs);


// 썸네일 클릭 이벤트 -> frame에 위임
frame.addEventListener("click", e => {
    e.preventDefault();
    createPop(e);
})

// close 버튼 클릭 이벤트 -> body에 위임
document.body.addEventListener("click", e => {
    closePop(e);
})


// 데이터 호출 함수 
function callData(url) {
    fetch(url)
        .then(data => {
            return data.json();
        })
        .then(json => {
            // console.log(json);
            // console.log(json.photos);
            // console.log(json.photos.photo);

            const items = json.photos.photo;

            createImgs(items);
            imgLoaded();
        })
}

// 이미지 생성 함수
function createImgs(items) {
    let result = "";

    items.forEach(item => {
        let title = item.title.split(",")[0];
        if (title.length > 30) title = title.slice(0, 35) + "..."

        result += `
        <article class="item">
            <div>

                <a class="pic" href="https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg">
                    <p>${title}</p>
                    <img src="https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_z.jpg">
                </a>

                <div class="profile">
                    <div class="info">
                        <img src="http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg">
                            <span>${item.owner}</span>
                    </div>
                    <i class="fa-solid fa-heart"></i>
                </.div>
            </div>
        </article>
        `;
    })

    frame.innerHTML = result;
}

// 이미지 로드 함수
function imgLoaded() {
    // 썸네일 이미지 엑박시
    const thumbs = document.querySelectorAll(".pic img");
    const len = thumbs.length;
    let count = 0;

    thumbs.forEach(img => {
        img.onerror = () => {
            img.setAttribute("src", "bbimg/pic2.jpeg")
        }
        img.onload = () => {
            count++;
            if (count == len) isoLayout();
        }
    })

    const profiles = document.querySelectorAll(".info img");

    profiles.forEach(img => {
        img.onerror = () => {
            img.setAttribute("src", "https://www.flickr.com/images/buddyicon.gif")
        }
    })
}

// Isotope 함수
function isoLayout() {
    const grid = new Isotope(frame, { // 배치할 요소의 부모요소
        itemSelector: ".item", // 배치할 요소명
        columnWidth: ".item", // 너비값을 구할 기준 요소명
        transitionDuration: "0.8s", // 화면 재배치시 요소가 움직이는 속도
    });

    loading.classList.add("off");
    frame.classList.add("on");

    // like 버튼 기능 토글
    const likes = frame.querySelectorAll("i");
    for (const like of likes) {
        like.addEventListener("click", e => {
            like.classList.toggle("on");
            e.target.closest("article").classList.add("like");
        })
    }

    // sort 기능 
    const sortBtns = document.querySelectorAll(".sort li");

    for (let btn of sortBtns)
        btn.addEventListener("click", e => {
            e.preventDefault();

            const sort = e.currentTarget.querySelector("a").getAttribute("href");

            grid.arrange({
                filter: sort
            });

            for (let btn of sortBtns) {
                btn.classList.remove("like_on");
            }

            e.currentTarget.classList.add("like_on");
        })
}

// aside 생성
function createPop(e) {
    const target = e.target.closest("a");
    if (!target) return;

    const imgSrc = e.target.closest("a").getAttribute("href");
    const pop = document.createElement("aside");
    pop.classList.add("gal_pop");
    let result = `
        <div div class="con" >
            <img src="${imgSrc}">
        </div>
        <span>CLOSE</span>
    `;
    pop.innerHTML = result;
    document.body.append(pop);

    new Anime(pop, {
        prop: "opacity",
        value: 1,
        transitionDuration: 500,
    })
}

// aside 제거
function closePop(e) {
    const pop = document.querySelector(".gal_pop");

    if (pop) {
        const close = pop.querySelector("span");

        if (e.target == close) {
            new Anime(pop, {
                prop: "opacity",
                value: 0,
                transitionDuration: 500,
                callback: () => {
                    pop.remove();
                }
            })
        }
    }
}