    

        var x=document.getElementById("demo");

        function startGeolocation() {
          var options;
          navigator.geolocation.getCurrentPosition(geoSuccess, options);
          setTimeout(startGeolocation, 1000);
        }

        function geoSuccess(position) {
          var gpsPosition = position;
          var coordinates = gpsPosition.coords;
          myLat = coordinates.latitude;
          myLong = coordinates.longitude;
          x.innerHTML="Latitude: " + myLat + 
          "<br>Longitude: " + myLong;

}


// new code ..........

var map;

function initialize() {
  var mapOptions = {
    zoom: 18,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position, options) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: 'You are here'
      });

      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);

