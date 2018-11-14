(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        window.addEventListener("batterystatus", onBatteryStatus, false);
        window.addEventListener("batterycritical", onBatteryCritical, false);
        window.addEventListener("batterylow", onBatteryLow, false);
    };
    function onBatteryStatus(info) {
        ShowInfo(info);
    }
    function onBatteryCritical(info) {
        ShowInfo(info);
    }
    function onBatteryLow(info) {
        ShowInfo(info);
    }
    function ShowInfo(info) {
        var element = document.getElementById('show');

        if (info.isPlugged == true) {
            var yn = "目前充電中";
        } else {
            var yn = "目前沒有充電";
        }

        element.innerHTML = "電池還有多少電: " + info.level + "%" + "<br />" +
                            "電池是否充電中: " + yn;
    }
})();
