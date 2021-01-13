import Data from '../../modules/data/DataGlobal';

function initMap() {
  const coordinates = { lat: 47.212325, lng: 38.933663 };
  const map = new google.maps.Map(document.getElementById('map'), {
    center: coordinates,
    zoom: 2,
  });
  const data = new Data();
  // const popupContent = '<p class="content">Что угодно</p>';

  // const marker = new google.maps.Marker({
  //   position: coordinates,
  //   map,
  //   animation: google.maps.Animation.DROP,
  // });

  // const infowindow = new google.maps.InfoWindow({
  //   content: popupContent,
  // });
  // marker.addListener('mouseover', () => {
  //   infowindow.open(map, marker);
  // });

  // marker.addListener('mouseout', () => {
  //   infowindow.close(map, marker);
  // });

  const geo = new google.maps.Geocoder();
  function getCountry(country) {
    const popupContent = `<p class="content">${country.TotalConfirmed}</p>`;
    const infowindow = new google.maps.InfoWindow({
      content: popupContent,
    });

    geo.geocode({ address: country.Country }, (results, status) => {
      // console.log(country,results,status)

      if (status === google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        // const marker = new google.maps.Marker({
        //   map,
        //   position: results[0].geometry.location,
        // });
        const circle = new google.maps.Circle({
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          map,
          center: results[0].geometry.location,
          radius: country.TotalConfirmed / 10,
          clickable: true,
        });

        circle.addListener('mouseover', () => {
          infowindow.setPosition(results[0].geometry.location);
          infowindow.open(map, circle);
        });

        circle.addListener('mouseout', () => {
          infowindow.close(map, circle);
        });
      } else if (status === 'OVER_QUERY_LIMIT') {
        setTimeout(() => {
          getCountry(country);
        }, 0);
      }
    });
  }

  data.getCountryAllCountries()
    .then((res) => res.map((element) => setTimeout(getCountry(element), 0)));

  map.setOptions({
    styles: [

      {
        elementType: 'geometry',
        stylers: [
          {
            color: '#242f3e',
          },
        ],
      },
      {
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#746855',
          },
        ],
      },
      {
        elementType: 'labels.text.stroke',
        stylers: [
          {
            color: '#242f3e',
          },
        ],
      },
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#d59563',
          },
        ],
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#d59563',
          },
        ],
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [
          {
            color: '#263c3f',
          },
        ],
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#6b9a76',
          },
        ],
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [
          {
            color: '#38414e',
          },
        ],
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [
          {
            color: '#212a37',
          },
        ],
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#9ca5b3',
          },
        ],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [
          {
            color: '#746855',
          },
        ],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
          {
            color: '#1f2835',
          },
        ],
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#f3d19c',
          },
        ],
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [
          {
            color: '#2f3948',
          },
        ],
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#d59563',
          },
        ],
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
          {
            color: '#17263c',
          },
        ],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#515c6d',
          },
        ],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [
          {
            color: '#17263c',
          },
        ],
      },
    ],
  });
}

export default initMap;
