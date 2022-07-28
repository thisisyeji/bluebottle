const wrap = document.querySelector(".wrap");

const key = "AIzaSyD1ZRgZNZXs590CNC6IbqqDi5RFFZNf1VM";
const playlistId = "PL4lFp_wxDge99W5pmCOrD4wb_ws1MaOkU";
const num = 5;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`

createList(url);

wrap.addEventListener("click", e => {
    e.preventDefault();

    if (!e.target.closest("a")) return;
    createPop(e);
})

document.body.addEventListener("click", e => {
    closePop(e);
})

function createList(url) {
    fetch(url)
        .then(data => {
            return data.json();
        })
        .then(json => {
            console.log(json.items);

            let items = json.items;
            let result = "";

            items.forEach(item => {
                let title = item.snippet.title.split("-")[0];
                let desc = item.snippet.description.split("FIND")[0];
                let date = item.snippet.publishedAt.slice(0, 10);

                if (desc.length > 100) desc = desc.slice(0, 150) + "..."


                result += `
            <article>
                <h3>${title}</h3>
                <div class="con">
                    <p>${desc}</p>
                    <span>${date}</span>
                </div>
                <a class="pic" href="#" data-vid="${item.snippet.resourceId.videoId}">
                    <img src="${item.snippet.thumbnails.standard.url}">
                </a>
            </article>
            `
            })
            wrap.innerHTML = result;
        })
}

function createPop(e) {
    let vidId = e.target.parentElement.getAttribute("data-vid");
    let pop = document.createElement("aside");
    pop.innerHTML = `
        <iframe src="https://www.youtube.com/embed/${vidId}" frameborder="0" allowfullscreen></iframe>
        <span>
            CLOSE
        </span>
    `;
    document.body.append(pop);
}

function closePop(e) {
    const pop = document.querySelector("aside");
    if (pop) {
        const close = pop.querySelector("span");
        if (e.target == close) pop.remove();
    }
}
