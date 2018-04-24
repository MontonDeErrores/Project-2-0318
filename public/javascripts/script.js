document.addEventListener('DOMContentLoaded', () => {
  window.onload = () => {
    const madrid = {
      lat: 40.4378698,
      lng: -3.8196207
    };
  
    const markers = [];
  
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: madrid
    });
  
    const center = {
      lat: undefined,
      lng: undefined
    };
  
    locationPlaces.forEach(places => {
      const pos = {
        lat: places.location.coordinates[1],
        lng: places.location.coordinates[0]
      };
      const pin = new google.maps.Marker({
        position: pos,
        map: map,
        title: places.name
      });
      markers.push(pin);
    });
  };
  console.log('IronGenerator JS imported successfully!');

}, false);
