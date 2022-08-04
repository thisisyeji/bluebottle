const sections = document.querySelectorAll('header, section');
const scrollBar = document.querySelector('.scroll_bar');
const lists = scrollBar.querySelectorAll('li');
const lists_a = Array.from(lists);

let base = -500;

let posArr = null;

let enableClick = true;

setPos();

// 윈도우 리사이즈 이벤트
window.addEventListener('resize', (e) => {
	setPos();

	const active = scrollBar.querySelector('li.on');
	const active_index = lists_a.indexOf(active);
	window.scroll(0, posArr[active_index]);
});

// 윈도우 스크롤 이벤트
window.addEventListener('scroll', (e) => {
	let scroll = window.scrollY || window.pageXOffset;
	activation(scroll);
});

// 각 리스트 클릭 이벤트
lists.forEach((li, index) => {
	li.addEventListener('click', (e) => {
		if (enableClick) {
			moveScroll(index);
			enableClick = false;
		}
	});
});

//활성화 함수
function activation(scroll) {
	lists.forEach((li, index) => {
		if (scroll >= posArr[index] + base) {
			for (let li of lists) li.classList.remove('on');
			lists[index].classList.add('on');

			for (let el of sections) el.classList.remove('on');
			sections[index].classList.add('on');

			// main에도 활성화 넣어주기
		} else if (scroll < posArr[0] + base) {
			for (let li of lists) li.classList.remove('on');
			lists[0].classList.add('on');
		}
	});
}

// 각 섹션의 오프셋 값 배열에 저장하는 함수
function setPos() {
	posArr = [];
	for (let section of sections) {
		posArr.push(section.offsetTop);
	}
}

// 스크롤 anime
function moveScroll(index) {
	new Anime(window, {
		prop: 'scroll',
		value: posArr[index],
		duration: 1000,
		callback: () => {
			enableClick = true;
		},
	});
}
