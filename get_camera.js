(function () {
    "use strict";
    // 初始從 localStorage 取資料，沒有就產生空的物件
    var data = load() || {};
    function load() {
        var data = window.localStorage.getItem('uploadData');
        return JSON.parse(data);
    }

    $(document).on('deviceready', function () {

        $(capturePhoto).click(function () {
            // 使用內建 cordova camera plugin api，傳入成功、失敗 function 與選項
            navigator.camera.getPicture(onSuccess, error, {
                // 修正照片方向，設定為 true
                //allowEdit: true,//允許編輯
                correctOrientation: true,
                quality: 100, // 預設 50
                targetWidth: 100, // 預設原圖大小
                targetHeight: 100, //預設原圖大小
                saveToPhotoAlbum: true 
            });
        });

    });

    function onSuccess(imageURI) {
        // 去掉前頭網址，取得檔案名稱
        alert('原始相片路徑' + imageURI);

        var fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
        alert('取得的檔案名稱' + fileName);

        data[fileName] = imageURI;

        alert(data[fileName]);

        // 將資料存到 localStorage
        alert('data內容' + data);
        save(data);

    }

    function error(err) {
        console.log(err);
    }

    function save(data) {
        alert('uploadData', JSON.stringify(data));
        window.localStorage.setItem('uploadData', JSON.stringify(data));

    }




})();