import './resizeBtn.scss';

class ResizeBtn {
  constructor() {
    this.main = document.createElement('button');
    this.main.classList.add('resize-btn');
    this.selector;
    this.main.addEventListener('click', () => this.resizeWin());
  }

  render(selector) {
    this.selector = selector;
    this.selector.appendChild(this.main);
  }

  resizeWin() {
    this.selector.classList.toggle('opened')
  }
}

export default ResizeBtn;
