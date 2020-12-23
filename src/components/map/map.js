import './map.scss';
import initMap from './initMap';
import Trigger from '../trigger/trigger';
import Tabs from '../tabs/tabs';

class Map {
  constructor() {
    this.group = 'cases'; // cases, deaths? recovered
    this.countMethod = 'true'; // abs, 100thousand
    this.period = 'true'; // total, day

    this.mapContainer = document.createElement('div');
    this.mapContainer.id = 'mapContainer';

    this.map = document.createElement('div');
    this.map.id = 'map';

    const triggerWrap = document.createElement('div');
    triggerWrap.classList.add('trigger-wrap');

    this.trigger = new Trigger('trigger1', 'countMethod', ['total', '100k']);
    this.trigger.render(triggerWrap);

    this.trigger2 = new Trigger('trigger2', 'period', ['total', 'daily']);
    this.trigger2.render(triggerWrap);

    this.mapContainer.appendChild(triggerWrap);
    this.mapContainer.appendChild(this.map);

    this.tabs = new Tabs('group', ['cases', 'deaths', 'recovered']);
    this.tabs.render(this.mapContainer);
  }

  // eslint-disable-next-line class-methods-use-this
  mapListener() {
    initMap();
  }

  render() {
    document.querySelector('.container').appendChild(this.mapContainer);
    this.mapListener();
  }

  rerender(state, value) {
    this[state] = value;
    console.log(state, value);
    this.mapListener();
  }
}

export default Map;
