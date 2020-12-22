function initMap() {
  const coordinates = { lat: 47.212325, lng: 38.933663 };
  const map = new google.maps.Map(document.getElementById('map'), {
    center: coordinates,
    zoom: 2,
  });
  const popupContent = '<p class="content">Что угодно</p>';

  const marker = new google.maps.Marker({
    position: coordinates,
    map,
    animation: google.maps.Animation.DROP,
  });

  const infowindow = new google.maps.InfoWindow({
    content: popupContent,
  });
  marker.addListener('mouseover', () => {
    infowindow.open(map, marker);
  });

  marker.addListener('mouseout', () => {
    infowindow.close(map, marker);
  });

  const geo = new google.maps.Geocoder();
  function getCountry(country) {
    geo.geocode({ address: country }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        const marker = new google.maps.Marker({
          map,
          position: results[0].geometry.location,
        });
      }
    });
  }

  const сшксду = new google.maps.Circle({
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    map,
    center: coordinates,
    radius: 11111,
    // Math.sqrt(citymap[city].population) * 100,
  });

  getCountry('USA');
  getCountry('Brazil');
  getCountry('Denmark');

  fetch('./styleForMap.json')
    .then((response) => response.json())
    .then((data) => map.setOptions({ styles: data }));
}

export default initMap;
