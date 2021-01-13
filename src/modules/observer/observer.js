class MapListeners {
  constructor() {
    // в свойстве m будет храниться хэш карта вида:
    // {eventName: [object1, object2, ...], eventName2: [...], ...}
    this.m = {};
  }

  add(listener, event) {
    if (this.m.hasOwnProperty(event)) {
      this.m[event].push(listener);
    } else {
      this.m[event] = [];
      this.m[event].push(listener);
    }
  }

  remove(listener, event) {
    if (this.m.hasOwnProperty(event)) {
      this.m[event].forEach((l) => {
        if (l === listener) {
          this.m[event].splice(this.m[event].indexOf(listener), 1);
          if (Object.keys(this.m[event]).length == 0) {
            delete this.m[event];
          }
        }
      });
    }
  }

  get() {
    return this.m;
  }
}

export default MapListeners;
