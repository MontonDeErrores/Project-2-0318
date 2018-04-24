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
    partyMaker.addListener('click', toggleBounce);

    partyMaker.addListener('click', function() {
      infowindow.open(map, partyMaker);
      toggleBounce;
    });


    function toggleBounce() {
      if (partyMaker.getAnimation() !== null) {
        partyMaker.setAnimation(null);
      } else {
        partyMaker.setAnimation(google.maps.Animation.BOUNCE);
      }
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
  };
  console.log('IronGenerator JS imported successfully!');

}, false);

  

