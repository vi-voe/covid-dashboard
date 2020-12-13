import './container.scss';

class Container {
  render() {
    const main = document.createElement('main');
    main.classList.add('container');
    const body = document.querySelector('body');
    body.appendChild(main)
  }
}

export default Container;
