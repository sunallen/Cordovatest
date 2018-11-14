(function () {
    "use strict";
    var getID = null;
    document.addEventListener("deviceready", onDeviceReady, false);
   

    function onDeviceReady() {
        var getoptions = { enableHighAccuracy: true, timeout: 30000 };
        getID = navigator.geolocation.getCurrentPosition(getSuccess, getError, getoptions);
    }

    var getSuccess = function (getposition) {
        var element1 = document.getElementById('show_getPosition');
        var getLat = getposition.coords.latitude;
        var getLon = getposition.coords.longitude;
        element1.innerHTML = "這是getPosition資訊<br />" +
              "緯度 " + getposition.coords.latitude + "<br />" +
              "經度(度)" + getposition.coords.longitude + "<br />" +
              "高度(度)" + getposition.coords.altitude + "<br />" +
              "位置誤差(公尺) " + getposition.coords.accuracy + "<br />" +
              "高度誤差((公尺)" + getposition.coords.altitudeAccuracy + "<br />" +
              "移動方向(度)" + getposition.coords.heading + "<br />" +
        "移動速度(公尺/秒)" + getposition.coords.speed + "<br />" +
              "取得位置資訊的時間 " + getposition.timestamp;
        initMap(getLat, getLon);
    };

    function initMap(getLat, getLon) { //建立Google 地圖

        var map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: getLat, lng: getLon }, //地圖中心點，套用Geolocation取得的經緯度
            scrollwheel: false,
            zoom: 15 //地圖顯示大小
        });

        var image = '../images/group-2.png'; //地圖上的icon圖示檔案路徑
        var marker = new google.maps.Marker({  //建立地圖上的icon圖示
            position: { lat: getLat, lng: getLon }, //地圖中心點，套用Geolocation取得的經緯度
            icon: image, //icon圖示
            map: map,
            title: "You are here!"
        });
    }

    // onError Callback receives a PositionError object
    //
    function getError(error) {
        alert('code: ' + error.code + '\n' +
              'message: ' + error.message + '\n');
    }

  //  navigator.geolocation.getCurrentPosition(onSuccess, onError);

})();

