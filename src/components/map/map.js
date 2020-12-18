import './map.scss';
import initMap from './initMap';

class Map {
  constructor() {
    this.mapContainer = document.createElement('div');
    this.mapContainer.id = 'map';
  }

  render() {
    document.querySelector('.container').appendChild(this.mapContainer);
    initMap();
  }
}

export default Map;
