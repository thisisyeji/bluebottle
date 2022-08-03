var mapContainer = document.getElementById('map'); // 지도를 표시할 div
const branch_btns = document.querySelectorAll('.branch li');
let bounds = new kakao.maps.LatLngBounds(); // 범위정보
const all_btn = document.querySelector('.allBtn');
const boxes = document.querySelectorAll('.lo_info .lo_box');
const all_box = document.querySelector('.all_info');

var mapOption = {
	center: new kakao.maps.LatLng(37.580154796973815, 126.98083908119813), // 지도의 중심좌표
	level: 3, // 지도의 확대 레벨
};

// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);

setDraggable(false);
setZoomable(false);

let markerOptions = [
	{
		title: 'Samcheong', // 이름
		latlng: new kakao.maps.LatLng(37.580154796973815, 126.98083908119813), // 위치값
		imgSrc: 'bbimg/logo.png', // 이미지 주소
		imgSize: new kakao.maps.Size(40, 40), // 이미지 사이즈
		imgPos: { offset: new kakao.maps.Point(25, 10) }, // 마커의 좌표와 일치시킬 이미지 안에서의 좌표
		button: branch_btns[0],
		content: '<div>Samcheong</div>',
	},
	{
		title: 'Yeoksam', // 이름
		latlng: new kakao.maps.LatLng(37.50003274471672, 127.03237191781037), // 위치값
		imgSrc: 'bbimg/logo.png', // 이미지 주소
		imgSize: new kakao.maps.Size(40, 40), // 이미지 사이즈
		imgPos: { offset: new kakao.maps.Point(25, 10) }, // 마커의 좌표와 일치시킬 이미지 안에서의 좌표
		button: branch_btns[1],
		content: '<div>Yeoksam</div>',
	},
	{
		title: 'Seongsu', // 이름
		latlng: new kakao.maps.LatLng(37.54809233592948, 127.04563832934205), // 위치값
		imgSrc: 'bbimg/logo.png', // 이미지 주소
		imgSize: new kakao.maps.Size(40, 40), // 이미지 사이즈
		imgPos: { offset: new kakao.maps.Point(25, 10) }, // 마커의 좌표와 일치시킬 이미지 안에서의 좌표
		button: branch_btns[2],
		content: '<div>Seongsu</div>',
	},
	{
		title: 'Apgujeong', // 이름
		latlng: new kakao.maps.LatLng(37.52557711275292, 127.02889860342552), // 위치값
		imgSrc: 'bbimg/logo.png', // 이미지 주소
		imgSize: new kakao.maps.Size(40, 40), // 이미지 사이즈
		imgPos: { offset: new kakao.maps.Point(25, 10) }, // 마커의 좌표와 일치시킬 이미지 안에서의 좌표
		button: branch_btns[3],
		content: '<div>Apgujeong</div>',
	},
];

// 마커 이미지를 해당위치에 위치시킴
for (let i = 0; i < markerOptions.length; i++) {
	// 마커를 생성
	let marker = new kakao.maps.Marker({
		// 마커 생성
		map: map, // 마커를 표시할 지도
		position: markerOptions[i].latlng, // 마커를 표시할 위치
		titie: markerOptions[i].title, // 제목
		imgPos: { offset: new kakao.maps.Point(116, 99) }, // 마커 이미지 안에서의 좌표
		image: new kakao.maps.MarkerImage(
			markerOptions[i].imgSrc,
			markerOptions[i].imgSize,
			markerOptions[i].imgPos
		), // 마커 이미지 정보 넣고 생성
	});

	// 커스텀 오버레이 생성
	let content = `
    <div class="mark_info">
        <p>${markerOptions[i].title}</p>
    </div>
    `;

	let customOverlay = new kakao.maps.CustomOverlay({
		map: map,
		position: markerOptions[i].latlng,
		content: content,
		yAnchor: 1,
	});

	// 지도 범위 재설정
	// LatLngBounds 객체에 좌표를 추가합니다
	bounds.extend(markerOptions[i].latlng);

	// 모든 좌표 위치 보기
	all_btn.addEventListener('click', (e) => {
		e.preventDefault();
		setBounds();

		for (let btn of branch_btns) {
			btn.classList.remove('on');
		}
		for (let box of boxes) {
			box.classList.remove('on');
		}

		all_box.classList.add('on');
	});

	// 브랜치 버튼을 클릭시 센터 위치 변경
	branch_btns[i].addEventListener('click', (e) => {
		e.preventDefault();

		let isOn = e.currentTarget.classList.contains('on');
		if (isOn) return;

		for (let btn of branch_btns) {
			btn.classList.remove('on');
		}
		branch_btns[i].classList.add('on');

		for (let box of boxes) {
			box.classList.remove('on');
		}
		boxes[i].classList.add('on');
		all_box.classList.remove('on');

		moveTo(markerOptions[i].latlng);
	});
}

// window resize 시 센터 이동
window.addEventListener('resize', () => {
	let active = document.querySelector('.branch li.on');
	const branch = Array.from(branch_btns);
	let active_index = branch.indexOf(active);
	console.log(active_index);

	if (active_index >= 0 && active_index < 4) {
		map.setCenter(markerOptions[active_index].latlng);
	} else {
		setBounds();
	}
});

// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
var mapTypeControl = new kakao.maps.MapTypeControl();

// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.BOTTOMLEFT);

// 지도 확대 축소를 제어할 수 있는 줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.LEFT);

// 버튼 클릭에 따라 지도 이동 기능을 막거나 풀고 싶은 경우에는 map.setDraggable 함수를 사용합니다
function setDraggable(draggable) {
	// 마우스 드래그로 지도 이동 가능여부를 설정합니다
	map.setDraggable(draggable);
}

// 버튼 클릭에 따라 지도 확대, 축소 기능을 막거나 풀고 싶은 경우에는 map.setZoomable 함수를 사용합니다
function setZoomable(zoomable) {
	// 마우스 휠로 지도 확대,축소 가능여부를 설정합니다
	map.setZoomable(zoomable);
}

// 센터 이동 함수
function moveTo(target) {
	let moveLatLon = target;
	map.setCenter(moveLatLon);
	map.setLevel(3, {
		animate: {
			duration: 500,
		},
	}); // 중심 좌표 레벨 복귀
}

// 중심 좌표 변경 함수
function setBounds() {
	// LatLngBounds 객체에 추가된 좌표들을 기준으로 지도의 범위를 재설정합니다
	// 이때 지도의 중심좌표와 레벨이 변경될 수 있습니다

	map.setBounds(bounds);
}
