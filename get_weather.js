我的JS碼如下：
(function () {
    "use strict";
    document.addEventListener('deviceready', onDeviceReady, false);
    function onDeviceReady() {
        var getoptions = { timeout: 30000 };
       //這一段是在取得經緯度
        navigator.geolocation.getCurrentPosition(getSuccess, getError, getoptions);
    };
    var getSuccess = function (getposition) {
       //將取得經緯度之，帶入loadWeather
        loadWeather(getposition.coords.latitude + ',' + getposition.coords.longitude);
    };
    function loadWeather(location, woeid) {
        var cont;
        $.simpleWeather({
            location: location,//經緯度座標
            woeid: woeid,//woeid，是Yahoo Weather裡很重要的一個參數，類似台灣的郵遞區號，Yahoo用自己的方式，將全世界的城市都做了一個編號，統稱為WOEID
            //因為我們是用經緯度判斷目前的所在地，因此woeid可以不用輸入。
            unit: 'c',//要顯示的是攝式
            success: function (weather) {
                cont = '<h3><i class="icon-' + weather.code + '"></i>您所在地的氣溫 ' + weather.temp + '&deg;' + weather.units.temp + '</h3>';
                cont += '<ul><li>您所在的城市<br/>' + weather.city + ', ' + weather.region + '</li><br/>';
                cont += '<li class="currently">您所在的天氣狀況<br/>' + weather.currently + '</li></ul><br/>';
                cont += '<img src="' + weather.image + '"/><hr/>';//天氣狀況的圖示
                $("#weather").html(cont);
            },
            error: function (error) {
                $("#weather").html('<p>' + error + '</p>');
            }
        });
    }
    function getError(error) {
        alert('get_error: ' + error.code + '\n' +
              'message: ' + error.message + '\n');
    }
    function watchError(error) {
        alert('watch_error: ' + error.code + '\n' +
              'message: ' + error.message + '\n');
    }
