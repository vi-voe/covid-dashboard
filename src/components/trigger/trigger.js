import { publisher } from '../../modules/observer/publisher';
import './trigger.scss';

class Trigger {
  constructor(id, value, text) {
    this.main = document.createElement('button');
    this.main.classList.add('trigger');
    this.main.id = id;
    this.ind = 1;
    this.text = text;
    this.main.innerHTML = this.text[this.ind];
    this.datasetName = value;
    this.main.dataset[this.datasetName] = true;

    this.main.addEventListener('click', () => this.switch());
  }

  render(selector) {
    selector.appendChild(this.main);
  }

  switch() {
    this.ind = (this.ind === 1) ? 0 : 1;
    document.querySelectorAll(`.trigger`)
      .forEach((el) => {
        if (!el.dataset[this.datasetName]) return;
        el.classList.toggle('trigger--on');
        el.innerHTML = this.text[this.ind];
        el.dataset[this.datasetName] = el.dataset[this.datasetName] != 'true';
      });
    publisher.notify(this.datasetName, this.main.dataset[this.datasetName]);
  }
}

export default Trigger;
