(function () {
    "use strict";
    var watchID = null;
    var map;
    var image = '../images/group-2.png'; //地圖上的icon圖示檔案路徑
    var currentPositionMarker;
    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
        var watchoptions = { enableHighAccuracy: true, timeout: 10000 };
      // 取得首次座標資訊，做為Center用。
        navigator.geolocation.getCurrentPosition(watchSuccess, watchError, watchoptions);
 
    }

    var watchSuccess = function (watchposition) {
        var element1 = document.getElementById('start_watchPosition');
        var getLat = watchposition.coords.latitude;
        var getLon = watchposition.coords.longitude;
     // 顯示原始座標資訊
        element1.innerHTML = "原始座標位置資訊<br />" +
               "緯度 " + getLat+ "<br />" +
               "經度" +  getLon;
     //呼叫建立地圖
        initMap(getLat, getLon);
     //呼叫進入更新Function
        navigator.geolocation.getCurrentPosition(updatePosition, locError);
    };


    function initMap(getLat, getLon) { //建立Google Mao
           map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: getLat, lng: getLon }, //地圖中心點，套用Geolocation取得的經緯度
            zoom: 14, //地圖顯示大小
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
    }

    function locError(error) { //ERROR CODE 導向
        // tell the user if the current position could not be located
        alert("The current position could not be found!");
    }

    function watchError(error) { //ERROR CODE 導向
        alert('watch_error: ' + error.code + '\n' +
              'message: ' + error.message + '\n');
    }


    function getCurrentPosition(pos) { //取得目前座標，並建立地圖上的marker icon
        var image = '../images/group-2.png';
        currentPositionMarker = new google.maps.Marker({
            icon: image,
            map: map,
            position: new google.maps.LatLng(
                pos.coords.latitude,
                pos.coords.longitude
            ),
            title: "Current Position"
        });
      map.panTo(new google.maps.LatLng( //移動marker icon至 移動中的座標
                pos.coords.latitude,
               pos.coords.longitude
            ));
   }

    function updatePosition(position) { //更新座標function

        // 取得目前位置
        getCurrentPosition(position);

        // 進入wacthPosition程序
        nowCurrentPosition();
    }

    function nowCurrentPosition() { //wacthPosition程序
        var nowPosition = navigator.geolocation.watchPosition( //watchPosition 會持續監控座標位置
            function (position) {
                setMarkerPosition(currentPositionMarker,position); //呼叫 更新座標icon function
                var element2 = document.getElementById('realtime_watchPosition');
                element2.innerHTML = "目前座標位置資訊<br />" +
                 "緯度 " + position.coords.latitude + "<br />" +
                 "經度" + position.coords.longitude;
            });
    }

    function setMarkerPosition(marker, position) {//更新座標icon function
        marker.setPosition(
            new google.maps.LatLng(
                position.coords.latitude,
                position.coords.longitude)
        );
    }


})();

