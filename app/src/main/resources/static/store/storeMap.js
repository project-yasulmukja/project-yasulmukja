// 주점 리스트 필요
var positions = [
    {   
        name: '카카오', 
        // latlng: new kakao.maps.LatLng(33.450705, 126.570677)
        address: '제주특별자치도 제주시 첨단로 242'
    },
    {   
        name: '광교호수공원',
        // latlng: new kakao.maps.LatLng(33.450936, 126.569477)
        address: '경기 수원시 영통구 하동 1020'
    },
    {   
        name: '매탄공원',
        // latlng: new kakao.maps.LatLng(33.450879, 126.569940)
        address: '경기 수원시 영통구 매탄동 1279-3'
    },
    {   
        name: '공원',
        // latlng: new kakao.maps.LatLng(33.451393, 126.570738),
        address: '경기 수원시 영통구 매탄로 185'
    }
];


var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

// 지도를 생성합니다    
var map = new kakao.maps.Map(mapContainer, mapOption); 

// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();


for (var i = 0; i < positions.length; i ++) {

    let address = positions[i].address
    let name = positions[i].name

    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(address, function(result, status) {
    
        // 정상적으로 검색이 완료됐으면 
        if (status === kakao.maps.services.Status.OK) {
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            // 커스텀 오버레이를 생성합니다
            var customOverlay = new kakao.maps.CustomOverlay({
                position: coords,
                content: `<div id="mapInfo"><i class="fa-solid fa-wine-bottle"></i><span>${name}</span></div>`   
            });

            // 커스텀 오버레이를 지도에 표시합니다
            customOverlay.setMap(map);

            map.setCenter(coords);
        } else {
            console.log('지도검색 실패')
        }
    });
}