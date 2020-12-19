import './table.scss';
import tableHeader from './var';
import Data from '../../modules/data/DataGlobal';
import Trigger from '../trigger/trigger';
import Tabs from '../tabs/tabs';

let selectedList;

class Table {
  constructor() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('list_wrap');
    this.list = document.createElement('ul');
    this.list.classList.add('list');

    const listHeader = document.createElement('h2');
    listHeader.classList.add('list__header');
    this.wrapper.appendChild(listHeader);
    const textContent = document.createTextNode(tableHeader);
    listHeader.appendChild(textContent);

    const triggerWrap = document.createElement('div');
    triggerWrap.classList.add('trigger-wrap');

    this.trigger = new Trigger('trigger3', 'countMethod', ['total', '100k']);
    this.trigger.render(triggerWrap);

    this.trigger2 = new Trigger('trigger4', 'period', ['total', 'daily']);
    this.trigger2.render(triggerWrap);

    this.wrapper.appendChild(triggerWrap);

    document.getElementById('bottom').appendChild(this.wrapper);

    this.tabs = new Tabs('group', ['cases', 'deaths', 'recovered']);
    this.tabs.render(this.wrapper);
  }

  render() {
    return this.wrapper.appendChild(this.list);
  }

  initListItem() {
    const list = this.render();
    const li = document.createElement('li');
    li.classList.add('list__item');
    return list.appendChild(li);
  }

  async initTableList() {
    this.data = new Data();
    const allContries = await this.data.getCountryAllCountries();
    Object.values(allContries).forEach((item) => {
      const list = this.initListItem();
      const span = document.createElement('span');
      list.appendChild(span);
      const Country = document.createTextNode(item.Country.toUpperCase());
      const TotalConfirmed = document.createTextNode(item.TotalConfirmed);
      list.appendChild(Country);
      span.appendChild(TotalConfirmed);
    });
    this.choiceLine();
  }

  choiceLine() {
    const list = this.render();
    list.addEventListener('click', (event) => {
      const { target } = event;
      if (target.tagName !== 'LI') return;
      this.highlight(target);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  highlight(td) {
    if (selectedList) {
      selectedList.classList.remove('list-active');
    }
    selectedList = td;
    // eslint-disable-next-line no-console
    console.log(selectedList);
    selectedList.classList.add('list-active');
  }
}

export default Table;
