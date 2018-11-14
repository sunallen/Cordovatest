(function () {
    "use strict";
    var watchID = null;
    var getID = null;
    document.addEventListener('deviceready', onDeviceReady, false);
 
    function onDeviceReady() {
        var getoptions = { timeout: 30000 };  
        getID = navigator.geolocation.getCurrentPosition(getSuccess, getError, getoptions);

        var watchoptions = { enableHighAccuracy: true, timeout: 10000 };
        watchID = navigator.geolocation.watchPosition(watchSuccess, watchError, watchoptions);
    };

    var getSuccess = function (getposition) {
        var element1 = document.getElementById('show_getPosition');
        element1.innerHTML = "這是getPosition資訊<br />" +
              "緯度 " + getposition.coords.latitude + "<br />" +
              "經度(度)" + getposition.coords.longitude + "<br />" +
              "高度(度)" + getposition.coords.altitude + "<br />" +
              "位置誤差(公尺) " + getposition.coords.accuracy + "<br />" +
              "高度誤差((公尺)" + getposition.coords.altitudeAccuracy + "<br />" +
              "移動方向(度)" + getposition.coords.heading + "<br />" +
        "移動速度(公尺/秒)" + getposition.coords.speed + "<br />" +
              "取得位置資訊的時間 " + getposition.timestamp ;
    };

    var watchSuccess = function (watchposition) {
        var element2 = document.getElementById('show_watchPosition');
        var llat = watchposition.coords.latitude;
        var llon = watchposition.coords.longitude;
        element2.innerHTML = "這是watchPosition資訊<br />" +
               "緯度 " + watchposition.coords.latitude + "<br />" +
              "經度(度)" + watchposition.coords.longitude + "<br />" +
              "高度(度)" + watchposition.coords.altitude + "<br />" +
              "位置誤差(公尺) " + watchposition.coords.accuracy + "<br />" +
              "高度誤差((公尺)" + watchposition.coords.altitudeAccuracy + "<br />" +
              "移動方向(度)" + watchposition.coords.heading + "<br />" +
        "移動速度(公尺/秒)" + watchposition.coords.speed + "<br />" +
              "取得位置資訊的時間 " + watchposition.timestamp;
      //  initMap(llat, llon);
    };

    function getError(error) {
        alert('get_error: ' + error.code + '\n' +
              'message: ' + error.message + '\n');
    }


    function watchError(error) {
        alert('watch_error: ' + error.code + '\n' +
              'message: ' + error.message + '\n');
    }
    /*
    navigator.geolocation.getCurrentPosition(watchSuccess, watchError);

    function initMap(llat,llon) {
        var map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: llat, lng: llon },
                zoom: 12
        });
        var infoWindow = new google.maps.InfoWindow({ map: map });

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                infoWindow.setPosition(pos);
                infoWindow.setContent('您在這.');
                map.setCenter(pos);
            }, function () {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
    }*/
})();