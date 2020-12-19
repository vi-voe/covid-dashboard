import { publisher } from '../../modules/observer/publisher';
import './tabs.scss';

class Tabs {
  constructor(data, values) {
    this.tabsContainer = document.createElement('div');
    this.tabsContainer.classList.add('tabs');
    this.datasetName = data;
    this.makeBtns(values);
    this.tabsContainer.addEventListener('click', (e) => this.showInfo(e));
  }

  makeBtns(values) {
    values.forEach((el, ind) => {
      const btn = document.createElement('button');
      btn.innerHTML = el;
      btn.classList.add('tabs__item');
      if (ind === 0) btn.classList.add('tabs__item--on');
      btn.dataset[this.datasetName] = el;

      this.tabsContainer.appendChild(btn);
    });
  }

  showInfo(e) {
    if (!e.target.classList.contains('tabs__item')) return;

    document.querySelectorAll('.tabs__item--on').forEach((el) => el.classList.remove('tabs__item--on'))
    document.querySelectorAll(`.tabs__item[data-${this.datasetName} = ${e.target.dataset[this.datasetName]}]`)
    .forEach((el) => el.classList.add('tabs__item--on'));

    publisher.notify(this.datasetName, e.target.dataset[this.datasetName]);
  }

  render(selector) {
    selector.appendChild(this.tabsContainer);
  }
}

export default Tabs;
