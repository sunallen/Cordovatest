 document.addEventListener('deviceready', onDeviceReady, false);

    function onDeviceReady() {
        $.ajax({
//這邊，直接呼叫述述範例的admin-ajax.php
//特別說明(一)因為必需要先login，但又不想讓使用者做「登入」這個動作，所以將帳號和密碼直接寫在要傳送出去的值當中，
//特別說明(二)Cordova 會將程式碼打包，所以比較不用擔心帳、密會被看到。
//特別說明(三)請不要將Wordpress裡的最高權限帳號和密碼，帶到此值當中。

            url: 'http://您的url/wp-admin/admin-ajax.php?action=login&username=account_name&password=password',
            type: 'post',
            dataType: "json",
            success: function (data) {
            var html ="";
                   for(var count = 0; count < data.length; count++)
        {
                var  title = data[count].title;
               var  link = data[count].link;
                var  date = data[count].date;
                var  image = data[count].image;
       html = html + "<li>" + "<a href='javascript:open_browser(\"" + link + "\")'>" + "<img height='128' width='128' src='" + image + "'>" + "<h2>" + title + "</h2>" + "<p>" + date + "</p></a></li>";
        }
             document.getElementById("posts").innerHTML = html;
        $("#posts").listview("refresh");
            }
        });
                function open_browser(link) {
            window.open(link, '_self', 'location=yes');
        }
}
最後，就可以看到結果啦! 