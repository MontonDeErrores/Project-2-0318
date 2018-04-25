document.addEventListener('DOMContentLoaded', () => {

  window.onload = () => {
    let partyName = $('#partyname').text();
    var markers = [];

    function setMapOnAll(map) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
      }
    }

    function clearMarkers() {
      setMapOnAll(null);
    }

    function deleteMarkers() {
      clearMarkers();
      markers = [];
    }

    if (partyName == "") {
      var latitude = 40.4381311;
      var longitude = -3.8196209;
    } else {
      var latitude = parseFloat($('#lat').text());
      var longitude = parseFloat($('#long').text());
    }

    //Cambia la imagen del marker por uno propio
    let image = 'http://res.cloudinary.com/ignlopezsanchez/image/upload/v1524588458/newMarker.png';
    var icon = {
      url: "http://res.cloudinary.com/ignlopezsanchez/image/upload/v1524588458/newMarker.png", // url
      scaledSize: new google.maps.Size(50, 80), // scaled size
    };

    //Informacion al clickear encima
    var contentString = `Nombre: <b>${partyName}</b>`
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    const partyLocation = {
      lat: latitude,
      lng: longitude
    };

    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: partyLocation
    });

    const partyMaker = new google.maps.Marker({
      position: {
        lat: latitude,
        lng: longitude
      },
      map: map,
      animation: google.maps.Animation.DROP,
      title: partyName,
      icon: icon
    });
    markers.push(partyMaker);

    partyMaker.addListener('click', function () {
      infowindow.open(map, partyMaker);
      //toggleBounce;
    });

    //Geolocaliza con browser
    var geocoder = new google.maps.Geocoder();

    document.getElementById('submit').addEventListener('click', function () {
      $('.hidemap').addClass('showmap')
      deleteMarkers()
      geocodeAddress(geocoder, map);
    });

    function geocodeAddress(geocoder, resultsMap) {
      var address = document.getElementById('address').value;

      geocoder.geocode({ 'address': address }, function (results, status) {
        if (status === 'OK') {
          resultsMap.setCenter(results[0].geometry.location);

          var marker = new google.maps.Marker({
            map: resultsMap,
            position: results[0].geometry.location,
            draggable: true,

          });
          markers.push(marker);

          marker.addListener('dragend', function () {
            $("#latitude").val(marker.getPosition().lat());
            $("#longitude").val(marker.getPosition().lng());
          });
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    }
  };
  console.log('IronGenerator JS imported successfully!');

}, false);



