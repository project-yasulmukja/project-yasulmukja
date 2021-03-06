var arr = location.href.split("?");
// console.log(arr);

var qs = arr[1];
// console.log(qs);

var params = new URLSearchParams(qs);
var no = params.get("no");
console.log(no);

var pbody = document.querySelector("#review-body")

// 주점상세 모달이미지 버튼
var next = document.querySelector('.next-store');
var pre = document.querySelector('.pre-store');

if (no == null) {
  alert("error");
  throw "파라미터 오류!";
}

// fetch
function targetList(targetNo) {

  var reservationData;
  var reviewsData;

  fetch(`/store/get?no=${no}`)
  .then(function(response) {
    return response.json() 
  }).then(function(data) {

      store = data
      console.log(store);
      storeTextBox(store)
      mapMarker(store)
  });

  fetch(`/review/get?no=${no}`)
    .then(function(response) {
      return response.json() 
    }).then(function(data) {
      
      console.log("reviews : ")
      console.log(data)
      reviewsData = data // 함수내 전역변수 활용
      StoreReviewPrint(data)
  });

  setTimeout(() => {
    fetch(`/reservation/get?no=${no}`)
    .then(function(response) {
      return response.json() 
    }).then(function(data) {

      console.log("reservation : ")
      console.log(data)
      reservationData = data // 함수내 전역변수 활용
      reviewMemberinfo(data)
    });
  }, 200);
  
}
targetList(no) // fetch 실행


// 리뷰 별점순 정렬
function listSortStar(dataNm) {
  $('#review-body').html(
    $('#review-body a').sort(function(a, b){
      return $(b).data(dataNm) - $(a).data(dataNm)
    })
  );
}
$(".choiceStar").click(function() {
  var dataNm = $(this).data("datanm"); //data()의 이름은 소문자로 작성
  listSortStar(dataNm);
});

// 리뷰 최신순 정렬
function listSortRecent(dataNm) {
  $('#review-body').html(
    $('#review-body a').sort(function(a, b){
      return $(b).data(dataNm) - $(a).data(dataNm)
    })
  );
}
$(".choiceRecent").click(function() {
  var dataNm = $(this).data("datanm"); //data()의 이름은 소문자로 작성
  listSortRecent(dataNm);
});

// 포토리뷰 학인해서 정렬
function listSortPhoto(dataNm) {
  $('#review-body').html(
    $('#review-body a').sort(function(a, b){
      return $(b).data(dataNm) - $(a).data(dataNm)
    })
  );
}
$(".choicePhoto").click(function() {
  var dataNm = $(this).data("datanm"); //data()의 이름은 소문자로 작성
  listSortPhoto(dataNm);
});

// 주점찜
let cntSwitch = true
$(".storeMnoCnt").click(function() {
  while(cntSwitch) { 
    let str = $(".storeMnoCnt").html()
    count = str.replace(/[^0-9]/g,''); // int 숫자만 추출
    count++
    cntSwitch = false
  }
  $(".storeMnoCnt").html(`<i id="heart" class="fa-heart fa-solid"></i>${count}`)
});



// Map 생성
var container = document.getElementById('map');
var options = {center: new kakao.maps.LatLng(33.450701, 126.570667), level: 3};
var map = new kakao.maps.Map(container, options);
var geocoder = new kakao.maps.services.Geocoder(); // 주소-좌표 변환 객체를 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

// 단일 Map마커생성
function mapMarker(store) {
  // 마커 생성
  let address = store.address
  let name = store.storeName
  // console.log(address, name)

  // 주소로 좌표를 검색합니다
  geocoder.addressSearch(address, function(result, status) {

    // 정상적으로 검색이 완료됐으면
    if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 커스텀 오버레이를 생성합니다
        var customOverlay = new kakao.maps.CustomOverlay({
            position: coords,
            content: `<div id="mapInfo"><span><i class="fa-solid fa-location-dot"></i></span></div>`
        });

        // 커스텀 오버레이를 지도에 표시합니다
        customOverlay.setMap(map);

        // 마지막으로 찍은 마커로 중심을 이동한다.
        map.setCenter(coords);
    } else {
        console.log(`${name}, ${address} 주소검색 실패`)
    }
  });
  
}
// 주점 정보 입력
function storeTextBox (store) {
  let storeOper = document.querySelector(".storeOper")
  let storeName = document.querySelector(".storeName")
  let storeAddress = document.querySelector(".storeAddress")
  let storeTel = document.querySelector(".storeTel")
  let storeIntro = document.querySelector(".storeIntro")
  let storeTimeInfo = document.querySelector(".storeTimeInfo")
  let storeStar = document.querySelector(".storeStar")
  let storeTag = document.querySelector(".storeTag")

  
  storeName.innerHTML = store.storeName // 주점이름
  storeAddress.innerHTML += store.address // 주점주소
  storeTel.innerHTML += store.tel // 주점주소
  storeIntro.innerHTML += store.introduction // 주점소개
  storeTimeInfo.innerHTML = store.hour // 영업시간
  storeTag.innerHTML += tags(store.tags) // 태그
  storeStar.innerHTML = printStar(store.evaluationScore) // 별점
  storeOper.innerHTML = printOper(store.oper) + " / " +  "&nbsp;" // 영업여부, 거리
  storeDetailImgPrint(store.storeImg) // 주점 이미지
  ModalImgPrint(store.storeImg) // 주점 모달 이미지
  storeAlcPrint(store.alcoholSales) // 추천주류
  storeMenuPrint(store.storeMenu) // 추천메뉴
  storeCountMno(store.storeNo) // 주점찜
  computeDistance(store.address) // 거리계산
}
// 영업여부
function printOper(oper) {
  let status = " ";
  if (oper == 1) {
    status = "영업중"
  } else {
    status = "종료"
  }
  return status;
}
// 태그
function tags (tagArr) {
  let tagStr = ""
  for (let i=0; i < tagArr.length; i++) {
    if (i == tagArr.length-1) {
      tagStr += "#" + tagArr[i].name
    } else {
      tagStr += "#" + tagArr[i].name + ", "
    }
  }
  return tagStr
}
// 별점
function printStar(score) {
  // console.log("score: " + score)
  let star = "⭐⭐⭐⭐⭐";
  if (1 == score) {
    star = "⭐"
  } else if(2 == score) {
    star = "⭐⭐"
  } else if(3 == score) {
    star = "⭐⭐⭐"
  } else if(4 == score) {
    star = "⭐⭐⭐⭐"
  } else if(5 == score) {
    star = "⭐⭐⭐⭐⭐"
  } else {
    star = "😥"
  }
  return star;
}
// 거리계산
function computeDistance(address) {
  let geocoder = new kakao.maps.services.Geocoder(); 
  const addressSearch = address => {// 주소 => 좌표리턴
      return new Promise((resolve, reject) => {
        geocoder.addressSearch(address, function(result, status) {
          if (status === kakao.maps.services.Status.OK) {
            resolve({"lat": result[0].y, "lng": result[0].x});
          } else {
            reject(status);
          }
        });
      });
  };
  //GeoLocation을 이용해서 접속 위치를 얻어옵니다
  const geoLocation = () => {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(function(position) {
        resolve({"lat": position.coords.latitude, "lng": position.coords.longitude});
      })
    })
  }
  const distanceLine = (storePos, curPos) => {
    return new Promise((resolve) => {

      // 선 객체 생성
      let linePath = [
        new kakao.maps.LatLng(storePos.lat, storePos.lng),
        new kakao.maps.LatLng(curPos.lat, curPos.lng)
      ];

      let polyline = new kakao.maps.Polyline({
        path : linePath
      });

      resolve(Math.round(polyline.getLength()))
    })
  }
  // async-await
  (async () => {
    try {
      const storeGeoResult = await addressSearch(address)
      const geoResult = await geoLocation()
      const distanceValue = await distanceLine(storeGeoResult, geoResult)

      if (1000 < distanceValue) {
        $('.storeDistance').html((distanceValue * 0.001).toFixed(0) + "km")
      } else {
        $('.storeDistance').html(distanceValue.toFixed(0) + "m")
      }
    } catch (e) {
        console.log(e);
    }
  })();
}
// 주점찜
function storeCountMno(storeNo) {
  fetch(`/store/getMnoCnt?no=${storeNo}`)
  .then(function(response) {
    return response.json() 
  }).then(function(cnt) {
    let storeMnoCnt = document.querySelector(".storeMnoCnt")
    storeMnoCnt.innerHTML += cnt
  });
}
// 추천주류
function storeAlcPrint(alcList) { 
  let sugAlcImg = document.querySelector(".sugAlcImg")
  let str = ""

  if (alcList.length == 0) {
    str = "추천주류를 준비중입니다."
  }

  for (let i=0; i < 5; i++) { // 최대 출력 5개
    str += `
    <a class="alc-link" href="/alcohol/alcoholdetail.html?no=${alcList[i].alcoholDetailNo}">
      <div class="sugAlcImg-card">
        <img class="xAlc-img" src="../alcohol/alcoholimg/alcohol${alcList[i].alcoholDetailNo}.png" alt="">
        <p class="xAlc-name">${alcList[i].name}</p>
        <p class="xAlc-price">${alcList[i].price}원</p>
      </div>
    </a>`

    // console.log(alcList[i].alcoholDetailNo)
    // console.log(alcList[i].price)
  }
  sugAlcImg.innerHTML = str
}
// 추천안주
function storeMenuPrint(storeMenuList) {
  let sugFoodImg = document.querySelector(".sugFoodImg")
  let str = ""

  if (storeMenuList.length == 0) {
    str = "추천메뉴를 준비중입니다."
  }

  for (let i=0; i < 5; i++) { // 최대 출력 5개
    str += `
      <div class="sugAlcImg-card">
        <img class="xAlc-img" src="../asset/img/storeMenu/storeMenu101-${i+1}.jpg" alt="">
        <p class="xAlc-name">${storeMenuList[i].storeMenuName}</p>
        <p class="xAlc-price">${storeMenuList[i].storeMenuPrice}원</p>
      </div>`

    // console.log(storeMenuList[i].storeMenuName)
    // console.log(storeMenuList[i].storeMenuPrice)
  }
  sugFoodImg.innerHTML = str
}
// 주점 이미지
function storeDetailImgPrint(Imgs) {
  
  let imgBox = document.querySelector(".img-box")
  let str 
  if (Imgs.length == 0) {
    str = "이미지를 준비중입니다."
  }
  // 최대 출력 5개
  str = `
  <img class="xMain-img" src="../asset/img/storeDetail/${Imgs[0].storeImg}.jpg" alt="">
  
  <div class="xSub-box">
    <div class="xSub-box1">
      <img class="xSub-img" src="../asset/img/storeDetail/${Imgs[1].storeImg}.jpg" alt="">
      <img class="xSub-img" src="../asset/img/storeDetail/${Imgs[2].storeImg}.jpg" alt="">
    </div>
    <div class="xSub-box2">
      <img class="xSub-img" src="../asset/img/storeDetail/${Imgs[3].storeImg}.jpg" alt="">
      <img class="xSub-img" src="../asset/img/storeDetail/${Imgs[4].storeImg}.jpg" alt="">
    </div>
  </div>`

  // console.log(Imgs)
  imgBox.innerHTML = str
}
// 주점상세 모달 이미지 
function ModalImgPrint(Imgs) {
  let str;
  let imgContainer = document.querySelector('.imgContainer')
  
  if (Imgs == null) {
    str = "이미지를 준비중입니다."
  }

  for (let i=0; i < Imgs.length; i++) {
    if (Imgs[i].storeImg == null) {
      continue
    }
    str += `<div class="storeContents-imgCard"><img class="ximg" src="../asset/img/storeDetail/${Imgs[i].storeImg}.jpg"></div>`
  }

  // console.log(str.slice(9, str.length))
  imgContainer.innerHTML = str.slice(9, str.length)
  nextPreBtnSet()
}
// 주점상세 모달이미지 버튼 이벤트
function nextPreBtnSet() {
  setTimeout(() => {
    // 주점 리스트 초기화 - 페이지 1로 맞추기
    let storeAll = document.querySelectorAll('.storeContents-imgCard');
    for (let i=1; i < storeAll.length; i++) {
      storeAll[i].style.display = "none";
    }
    // cursor를 기준으로 앞뒤로 모두 none으로 변경
    let cursor = 0;
    let endPage = storeAll.length;
    function moveAl(cursor) {
      if (storeAll[cursor].style.display == null || storeAll[cursor].style == null) {
        return
      }
      if (storeAll[cursor].style.display == "none") {
        storeAll[cursor].style.display = "flex"
      } else {
        return
      }
      for (let i=cursor+1; i < endPage; i++) {
        storeAll[i].style.display = "none";
      }
      for (let i=cursor-1; i < cursor; i--) {
        if (i == -1) {
          break;
        };
        storeAll[i].style.display = "none";
      }
    }
    next.addEventListener("click", () => {
      if (cursor+1 == endPage) {
        console.log("next: Over page")
      } else {
        cursor += 1;
        console.log("cursor : " + `${cursor}`);
        moveAl(cursor);
      }
    });
    pre.addEventListener("click", () => {
      if (cursor == 0) {
        console.log("pre: Over page")
      } else {
        cursor -= 1;
        moveAl(cursor);
        console.log("cursor : " + `${cursor}`);
      }
    });
  }, 500)
}
// 주점리뷰 (기본최신순) : reviewImgPrint, reviewMemberinfo
function StoreReviewPrint(reviewData) {
  let xReviewBox = document.querySelector(".xReviewBox")
  let str = ""

  if (reviewData == null) {
    console.log("reviewData null")
  }
  //reviewData[i].reviewImgs[0].img
  
  for (let i=0; i < reviewData.length; i++) {

    // 포토리뷰 데이터 생성
    let reviewImgs = reviewData[i].reviewImgs
    let returnImgCnt;
    if (reviewImgs.length == 1) {
      if (reviewImgs[0].img == null) {
        returnImgCnt = 0
      } else {
        returnImgCnt = 1
      }      
    } else {
      returnImgCnt = reviewImgs.length
    }

    str += 
      `<a data-stars=${reviewData[i].score} data-recent=${reviewData[i].reservationNo} data-photo=${returnImgCnt}>
        <div class="storeReviewBack">
          <div class="reviewprofile">
            <div class="profile-img"></div>
            <div class="reviewerName"></div>
            <div class="reviewStar">${printStar(reviewData[i].score)}</div>
          </div>
          <div class="reviewContents">
            <div class="reviewDate">${reviewData[i].regDate.slice(0, 10)}</div>
            <div class="reviewText">${reviewData[i].contents}</div>
            <div class="reviewImgBox">${reviewImgPrint(reviewData[i].reviewImgs)}</div>
          </div>
        </div>
      </a>`
  }
  xReviewBox.innerHTML = str
}
// 주점 평점, 회원이 선택한 별점을 표시함
function printStar(score) {
  // console.log("score: " + score)
  score = Math.round(score)
  let star = "⭐⭐⭐⭐⭐";
  if (1 == score) {
    star = "⭐"
  } else if(2 == score) {
    star = "⭐⭐"
  } else if(3 == score) {
    star = "⭐⭐⭐"
  } else if(4 == score) {
    star = "⭐⭐⭐⭐"
  } else if(5 == score) {
    star = "⭐⭐⭐⭐⭐"
  } else {
    star = "😥"
  }
  return star;
}
// 리뷰 이미지 출력
function reviewImgPrint(rimgs) {
  
  let str =""
  // let reviewImgBox = document.querySelector(".reviewImgBox")
  for (let i=0; i < rimgs.length; i++) {
    if (rimgs[i].img != null) {
      str += `<img class="review-img" src="../asset/img/storeReviewImg/${rimgs[i].img}.jpg" alt="">`
    } else {
      continue
    }
  }
  // console.log(str)
  return str
}
//리뷰 닉네임, 회원사진
function reviewMemberinfo(reservationInfo) {
  let reviewerNames = document.querySelectorAll(".reviewerName")
  let profileImg = document.querySelectorAll(".profile-img")
  for (let i=0; i < reservationInfo.length; i++) {
    if (reservationInfo[i].member[0].nickName != null) {
      // console.log(reservationInfo[i].member[0].nickName)
      // console.log(reservationInfo[i].member[0].mimg)
      // console.log(reservationInfo[i])
      reviewerNames[i].innerHTML = reservationInfo[i].member[0].nickName
      profileImg[i].innerHTML = `<img src="../asset/img/member/${reservationInfo[i].member[0].mimg}">`
    } else {
      continue
    }
  }
}


// // ES6 Modules or TypeScript
// import Swal from 'sweetalert2'

// // CommonJS
// const Swal = require('sweetalert2')


$(".report").click(function () {
  reportModal();
})
function reportModal() {
  Swal.fire({
      title: '신고하기',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      inputLabel: '신고 이유를 적어주세요',
      showCancelButton: false,
      confirmButtonText: '제출하기',
      showLoaderOnConfirm: true,
      preConfirm: () => {
          var rContent = document.querySelector(".swal2-input");
          
          fetch(`/report/add?no=${no}&rtype=b&rcontent=${rContent.value}`, { // 회원: m, 주점: s, 게시글: b 
              method : "POST"
          }).then(response => {
              return response.json()
          }).then((result) => {
              if (result.data == "로그인 하지 않았습니다!") {
              alert("로그인 후 신고가 가능합니다.")
          } else {
              Swal.fire({
                  icon: 'success',
                  text: '신고가 접수되었습니다.',
                  showCancelButton:false,
                  confirmButtonColor:'#90d483',
                  cancelButtonColor: '#90d483',
                  confirmButtonText:'확인',
              })
          }
      })
  }
})
}