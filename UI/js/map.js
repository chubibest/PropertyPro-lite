/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/**
 * function initMap
 */
function initMap() {
  const mapDiv = document.getElementById('map');
  mapDiv.style.height = '500px';
  mapDiv.style.width = '600px';
  const latLong = {
    lat: -25.344,
    lng: 131.036
  };
  const mapOptions = {
    zoom: 8,
    center: latLong
  };
  const map = new google.maps.Map(mapDiv, mapOptions);

  const markerOptions = {
    position: latLong,
    map,
    title: 'Property location.'
  };
  const marker = new google.maps.Marker(markerOptions);
}
