function initMap() {
  const coordinates = { lat: 47.212325, lng: 38.933663 };
  const map = new google.maps.Map(document.getElementById("map"), {
    center: coordinates,
    zoom: 8,
  });
  const popupContent = '<p class="content">Что угодно</p>';

  const marker = new google.maps.Marker({
    position: coordinates,
    map: map,
    animation: google.maps.Animation.DROP,
  });

  const infowindow = new google.maps.InfoWindow({
    content: popupContent,
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
});
}

export default initMap;
