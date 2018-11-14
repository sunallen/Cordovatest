

document.addEventListener("deviceready", onDeviceReady, false);
var r_start; //開始的位置
var r_end;  //結束的位置
var getlat;
var getlon;
var myCenter;
var map;

var directionsService = new google.maps.DirectionsService;
var directionsDisplay = new google.maps.DirectionsRenderer;

function getError(error) {
    alert('code: ' + error.code + '\n' +
          'message: ' + error.message + '\n');
}
function onDeviceReady() {

    $("#show_tree").on("click", function initMap() {
        if ($('input[name=r_start]:checked').val() == 1) {
            getCenter();   
        } else {
            myCenter = new google.maps.LatLng(22.7969679, 121.121909);
            getmap(myCenter);
        }
    });
}

function getmap(myCenter) {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: myCenter
    });
    directionsDisplay.setMap(map);
    calculateAndDisplayRoute(directionsService, directionsDisplay, myCenter);

}
function getCenter() {
    var getoptions = { enableHighAccuracy: true, timeout: 30000 };
    navigator.geolocation.getCurrentPosition(getSuccess, getError, getoptions);
   
}

var getSuccess = function (getposition) {
    getlat = getposition.coords.latitude;
    getlon = getposition.coords.longitude;
    //alert(getlat + "," + getlon);
  //  myCenter = {
    //    lat: getposition.coords.latitude,
   //     lng: getposition.coords.longitude
  //  };
  //  map.setCenter(myCenter);
    myCenter = new google.maps.LatLng(getlat, getlon);
    getmap(myCenter);
 //   alert(myCenter);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay, myCenter) {

    var waypts = [];
    var checkboxArray = document.getElementById('waypoints');
    for (var i = 0; i < checkboxArray.length; i++) {
        if (checkboxArray.options[i].selected) {
            waypts.push({
                location: checkboxArray[i].value,
                stopover: true
            });
        }
    }

    directionsService.route({
        origin: myCenter,
        destination: document.getElementById('end').value,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING
    }, function (response, status) {
        //      alert(myCenter);
        //        alert(document.getElementById('start').value);
        if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            var route = response.routes[0];
            var summaryPanel = document.getElementById('directions-panel');
            summaryPanel.innerHTML = '';
            // For each route, display summary information.
            for (var i = 0; i < route.legs.length; i++) {
                var routeSegment = i + 1;
                summaryPanel.innerHTML += '<b>路線介紹: ' + routeSegment +
                    '</b><br>';
                summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
                summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
                summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
            }
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}


function locError(error) {
    // the current position could not be located
}

function locSuccess(position) {
    // initialize map with current position and calculate the route
    initRoute(position.coords.latitude, position.coords.longitude);
}



