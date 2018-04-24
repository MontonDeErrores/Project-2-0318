document.addEventListener('DOMContentLoaded', () => {

  window.onload = () => {
    let latitude = parseFloat($('#lat').text());    
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
      title: "I'm here"
    });
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

  

