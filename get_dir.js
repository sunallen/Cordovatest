

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
 

    $("#show_tree").on("click", function initMap() {
               
        var newJRailway = { lat: 22.7969679, lng: 121.121909 };//出發點
        var tree = { lat: 23.0973591, lng: 121.2023173 };//目的地

            var map = new google.maps.Map(document.getElementById('map'), { //宣告Google MAP
                center: newJRailway,
                scrollwheel: false,
                zoom: 14
            });

            var directionsDisplay = new google.maps.DirectionsRenderer({ //載入服務
                map: map
            });
            var directionsService = new google.maps.DirectionsService; //載入服務
            directionsDisplay.setPanel(document.getElementById('output'));

            // 設定出發地與目的地的座標和移動方式
            var request = {
                destination: tree,
                origin: newJRailway,
                optimizeWaypoints: true,
                travelMode: 'DRIVING' //此為開車
            };
            var directionsService = new google.maps.DirectionsService();
            directionsService.route(request, function (response, status) {
                if (status == 'OK') {
                    // 回傳相關資訊
                    directionsDisplay.setDirections(response);
                }
            });
        }
        
        //
)};


        function locError(error) {
            // the current position could not be located
        }

        function locSuccess(position) {
            // initialize map with current position and calculate the route
            initRoute(position.coords.latitude, position.coords.longitude);
        }



