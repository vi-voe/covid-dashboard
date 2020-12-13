import './container.scss';

class Container {
  constructor() {
    this.main = document.createElement('main');
    this.main.classList.add('container');
  }

  render() {
    document.querySelector('body').appendChild(this.main);
  }
}

export default Container;
