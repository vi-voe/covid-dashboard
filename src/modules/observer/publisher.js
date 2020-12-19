import MapListeners from './observer';

class Publisher {
  constructor() {
    this.mapList = new MapListeners();
  }

  subscribe(listener, event) {
    this.mapList.add(listener, event);
  }

  unscribe(listener, event) {
    this.mapList.remove(listener, event);
  }

  notify(event, data) {
    if (this.mapList.get()[event]) {
      this.mapList.get()[event].forEach((listener) => {
        listener.rerender(event, data);
      });
    }
  }
}

const publisher = new Publisher();

export { publisher };
