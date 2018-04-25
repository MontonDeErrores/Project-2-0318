document.addEventListener('DOMContentLoaded', () => {

  window.onload = () => {
    let partyName = $('#partyname').text();
    let latitude = parseFloat($('#lat').text());
    let image = 'http://res.cloudinary.com/ignlopezsanchez/image/upload/v1524588458/newMarker.png';
    var icon = {
      url: "http://res.cloudinary.com/ignlopezsanchez/image/upload/v1524588458/newMarker.png", // url
      scaledSize: new google.maps.Size(50, 80), // scaled size
    };

    var contentString = `Nombre: <b>${partyName}</b>`

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    console.log(latitude)
    let longitude = parseFloat($('#long').text());
    console.log(longitude)

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
    //partyMaker.addListener('click', toggleBounce);

    partyMaker.addListener('click', function () {
      infowindow.open(map, partyMaker);
      //toggleBounce;
    });

    //Centra el mapa
    // function placeMarkerAndPanTo(latLng, map) {
    //   var marker = new google.maps.Marker({
    //     position: latLng,
    //     map: map
    //   });
    //   map.panTo(latLng);
    // }

    //Hace que el marcador salte
    // function toggleBounce() {
    //   if (partyMaker.getAnimation() !== null) {
    //     partyMaker.setAnimation(null);
    //   } else {
    //     partyMaker.setAnimation(google.maps.Animation.BOUNCE);
    //   }
    // }

    // map.addListener('click', function (e) {
    //   placeMarkerAndPanTo(e.latLng, map);
    // });

    //Geolocaliza con browser
    var geocoder = new google.maps.Geocoder();

    document.getElementById('submit').addEventListener('click', function () {
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
          marker.addListener('dragend', function() {
            // Do something with the positions here
            // once the user has finished dragging the marker
            //console.log(marker.getPosition().lat());
            //console.log(marker.getPosition().lng()); 
            $("#latitude").val(marker.getPosition().lat());
            $("#longitude").val(marker.getPosition().lng());
        });
        
          //console.log(results[0].geometry.location.lat())
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    }

    

      // locationPlaces.forEach(places => {
      //   const pos = {
      //     lat: event.location.coordinates[1],
      //     lng: event.location.coordinates[0]
      //   };

      //   const pin = new google.maps.Marker({
      //     position: pos,
      //     map: map,
      //     title: places.name
      //   });
      //   markers.push(pin);
      // });


      //Try HTML5 geolocation.
      var infoWindow = new google.maps.InfoWindow({map: map});


      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          console.log(pos)
          infoWindow.setPosition(pos);
          infoWindow.setContent('Location found.');
          map.setCenter(pos);
          var marker = new google.maps.Marker({
            map: resultsMap,
            position: results[0].geometry.location,
            draggable: true,
            
          });
        }, function () {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }


      // function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      //   infoWindow.setPosition(pos);
      //   infoWindow.setContent(browserHasGeolocation ?
      //     'Error: The Geolocation service failed.' :
      //     'Error: Your browser doesn\'t support geolocation.');
      // }


    };
    console.log('IronGenerator JS imported successfully!');

  }, false);



