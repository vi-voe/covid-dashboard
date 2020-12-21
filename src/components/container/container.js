import './container.scss';

class Container {
  constructor() {
    this.main = document.createElement('main');
    this.main.classList.add('container');

    const top = document.createElement('div');
    top.classList.add('row');
    top.id = 'top';

    const bottom = document.createElement('div');
    bottom.classList.add('row');
    bottom.id = 'bottom';

    this.main.appendChild(top);
    this.main.appendChild(bottom);
  }

  render() {
    document.querySelector('body').appendChild(this.main);
  }
}

export default Container;
