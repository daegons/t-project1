document.querySelector("#map > div > div > div > div:last-child img ");

// --------------- 카카오맵 ---------------

var mapContainer = document.getElementById("map"), // 지도를 표시할 div
  mapOption = {
    center: new kakao.maps.LatLng(36.436373, 128.034173), // 지도의 중심좌표
    level: 10, // 지도의 확대 레벨
  };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

function mapOpen() {
    mapContainer.style.display = "block";
}

// 지도를 전달받은 위도, 경도 값으로 부드럽게 이동시키는 함수
function panTo(a, b) {
  var moveLatLon = new kakao.maps.LatLng(a, b);
  map.panTo(moveLatLon);
}

//마커 이미지
// var imageSrc = "./img/icons8-map-pin-48-MMain.png", // 마커이미지의 주소입니다
var imageSrc = "./img/marker.png", // 마커이미지의 주소입니다
  imageSize = new kakao.maps.Size(40, 40); // 마커이미지의 크기입니다
var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
//------------

// 화면에 마커를 표시하는 함수
var markers = [];
function addMarker(position, nameAll,lat, lng, address, phone) {
  var marker = new kakao.maps.Marker({
    map: map, //
    position: position,
    image: markerImage, //마커 이미지
  });
  marker.setMap(map);
  markers.push(marker);

  var iwContent =
    `<div class="overlaybox">` +
    `<div class="first">` +
    `        <div class="movietitle text">${nameAll}</div>` +
    `    </div>` +
    `    <ul>` +
    `        <li class="up">` +
    `            <span class="number">주소:</span>` +
    `            <span class="title">${address}</span>` +
    // `            <span class="arrow up"></span>` +
    // `            <span class="count">2</span>` +
    `        </li>` +
    `        <li>` +
    `            <span class="number">HP:</span>` +
    `            <span class="title">${phone}</span>` +
    // `            <span class="arrow up"></span>` +
    // `            <span class="count">6</span>` +
    `        </li>` +
    `    </ul>` +
    `</div>`;

  var infowindow = new kakao.maps.InfoWindow({
    content: iwContent,
    removable: true,
  });
  kakao.maps.event.addListener(marker, "click", function () {
    let overlay = document.querySelector(".overlaybox");
    if (overlay == null) {
      infowindow.open(map, marker);
      weather(nameAll, lat, lng);
    } else {
      overlay = null;
    }
  });
}

function setMarkers(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function showMarkers() {
  setMarkers(map);
}

function hideMarkers() {
  setMarkers(null);
}

var global = [];
$.get("./json/info.json", function (data) {
  global = data.records;
  useData(data.records);
});

//----------------------정보박스------------------------------
function cityMarker(city) {
  // 시도명을 인수로 받아 마크를 표시하는 함수선언
  if(city != 'none'){
  let cityList = global.filter((a) => {
    let sidoList = a.sidoName.split(" ");
    return sidoList[0] === city;
  });

  for (let i in cityList) {
    addMarker(
      new kakao.maps.LatLng(cityList[i].lat, cityList[i].lng),
      cityList[i].name,
      cityList[i].lat,
      cityList[i].lng,
      cityList[i].address,
      cityList[i].phone,
    );
  }

  // 지도위치를 현재 선택한 도시의 첫번째 레코드의 위도, 경도값으로 이동하는 함수 호출
  panTo(cityList[0].lat, cityList[0].lng);
 }
}

// 시도명을 인수로 받아 마크를 표시하는 함수선언
function cityMarker2(city) {
  if(city != 'none'){
  let cityList = global.filter((a) => {
    let sidoList = a.sidoName.split(" ");
    return sidoList[1] === city;
  });
  for (let i in cityList) {
    addMarker(
      new kakao.maps.LatLng(cityList[i].lat, cityList[i].lng),
      cityList[i].name,
      cityList[i].lat,
      cityList[i].lng,
      cityList[i].address,
      cityList[i].phone,
    );
  }

  // 지도위치를 현재 선택한 도시의 첫번째 레코드의 위도, 경도값으로 이동하는 함수 호출
  panTo(cityList[0].lat, cityList[0].lng);
}
}

// 시도명을 인수로 받아 구군셀렉트를 나타내는 함수선언
function sebu(city) {
  let sebuList = [];
  let option = `<option value="none">자세한 지역을 선택해주세요.</option>`;

  let cityList = global.filter((a) => {
    let sidoList = a.sidoName.split(" ");
    if (sidoList[0] === city) {
      return sidoList;
    }
  });

  for (let i in cityList) {
    let abc = [];
    abc = cityList[i].sidoName.split(" ");
    if (abc[1] != null) {
      sebuList.push(abc[1]);
    }
  }

  let sebuIndex = sebuList.filter((a, b) => sebuList.indexOf(a) === b);
  sebuIndex.sort();

  sebuIndex.map((a) => {
    option += `<option value="${a}">${a}</option>`;
  });

  $("#detail").html(option);
}

// 시도 목록을 button 상자에 표시하는 함수
function useData(globalData) {
  let list = globalData.map((a, b) => {
    let sidoList = a.sidoName.split(" ");
    return sidoList[0];
  });

  let cityIndex = list.filter((a, b) => list.indexOf(a) === b);
  cityIndex.sort();

  let button = `<option id="btnn" value="none">지역을 선택해주세요.</option>`;
  

  cityIndex.map((value) => {
    button += `<option id="btnn" value="${value}">${value}</option>`;
  });
  $('#btn').html(button)
}




//이벤트
$("#detail").change(function () {
  hideMarkers(); // 선택을 변경했을때 표시된 마커 숨기기
  let city = $(this).val(); // 선택된 시도명을 추출해서
  cityMarker2(city); // 마커를 표시하는 함수를 호출문에 넣어줌
});

$("#btn").click((e) => {
  hideMarkers();
  let city = e.target.value;
  cityMarker(city);
  sebu(city);
  $(this).addClass("on");
  map.getLevel = 10;
  
});

var level = map.getLevel();

// ----------------------------------------------------------

function weather(nameAll, lnga, latb) {
  navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
  let clickAlram = document.querySelector(".clickAlram");
  let nameAlla = nameAll;
  let lngaa = lnga;
  let latbb = latb;

  let lang = "kr";
  function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getWeather(lat, lon);
  }

  clickAlram.style.display = "none";

  function onGeoError() {
    alert("날씨를 제공할 위치를 찾을 수 없습니다.");
  }

  function getWeather(lat, lon) {
    $.ajax({
      url: `https://api.openweathermap.org/data/2.5/weather?lat=${lngaa}&lon=${latbb}&appid=c2d0e5bbe716ac60f8541d884dda4c9c&lang=${lang}`,
      type: "GET",
      data: { units: "metric" }, // 섭씨로 변환
      success: function (data) {
        Info(data); // temp, weather
        // menuInfo(data)
      },
      error: function (arg) {
        alert("통신실패시에만 실행");
      },
    });
  }

  function Info(data) {
    let weatherIcon = {
      "01": "fas fa-sun",
      "02": "fas fa-cloud-sun",
      "03": "fas fa-cloud",
      "04": "fas fa-cloud-meatball",
      "09": "fas fa-cloud-sun-rain",
      10: "fas fa-cloud-showers-heavy",
      11: "fas fa-poo-storm",
      13: "far fa-snowflake",
      50: "fas fa-smog",
    };
    let weatherSpan = document.querySelector(".weatherInfo span");
    let weatherI = document.querySelector(".weatherIcon i");
    let weatherGet = data.weather[0].description;
    let iconReady = weatherIcon[data.weather[0].icon.substr(0, 2)];
    let tempUp = Math.ceil(data.main.temp * 10) / 10; // 반올림
    // let temp = ''
    let weather = "";
    let icon = "";

    // temp += `<span>현재온도는 ${num}°C</span>`
    weather += `<span>현재<br><span class="tourName">'${nameAll}'</span><br>의 날씨는 <span>'${weatherGet}'</span>입니다.</span>`;
    icon = `<i class="${iconReady}"></i>`;
    // $('.tempInfo').append(temp)
    if (weatherSpan != null) {
      weatherSpan.remove("span");
    }
    if (weatherI != null) {
      weatherI.remove("i");
    }
    $(".weatherIcon").prepend(icon);
    $(".weatherInfo").append(weather);

    //숫자 증가 애니메이션
    $({ val: 0 }).animate(
      { val: tempUp },
      {
        duration: 1000,
        step: function () {
          var num = numberWithCommas(this.val.toFixed(1));
          $(".tempInfo").text(num);
        },
        complete: function () {
          var num = numberWithCommas(this.val.toFixed(1));
          $(".tempInfo").text(num);
        },
      },
    );
    document.querySelector(".left2 .nowTemp span").style.display =
      "inline-block";

    function numberWithCommas(x) {
      return x;
    }
    // 숫자증가 애니메이션 끝
  }

  let icon = document.querySelectorAll(".list");
  let indi = document.querySelector(".indicator");

  function menuAct(e) {
    icon.forEach((i) => i.classList.remove("active"));
    this.classList.add("active");
    e.preventDefault();
  }
  icon.forEach((i) => i.addEventListener("click", menuAct));
}
