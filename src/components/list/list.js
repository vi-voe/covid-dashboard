import './list.scss';
import tableTitle from './var';
import Data from '../../modules/data/DataGlobal';
import Keyboard from '../keyboard/keyboard';
import Tabs from '../tabs/tabs';
// import TableGlobalDeath from './TableGlobalDeath';

let selectedList;

class List {
  constructor() {
    this.group = 'cases'; // cases, deaths? recovered
    this.countMethod = 'false'; // abs, 100thousand
    this.period = 'false'; // total, day

    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('list_wrap');

    this.list = document.createElement('ul');
    this.list.classList.add('list');

    const listTitle = document.createElement('h2');
    listTitle.classList.add('list__title');
    this.wrapper.appendChild(listTitle);

    this.search = document.createElement('textarea');
    this.search.setAttribute('placeholder', 'Search');
    this.search.classList.add('search');
    this.search.classList.add('use-keyboard-input');

    const titleContent = document.createTextNode(tableTitle);
    listTitle.appendChild(titleContent);

    const triggerWrap = document.createElement('div');
    triggerWrap.classList.add('trigger-wrap');

    this.wrapper.appendChild(triggerWrap);

    this.tabs = new Tabs('group', ['cases', 'deaths', 'recovered']);
    this.tabs.render(this.wrapper);
    this.wrapper.appendChild(this.search);

    // this.TableGD = new TableGlobalDeath();
    // this.TableGD.render();

    document.querySelector('#top').appendChild(this.wrapper);
    Keyboard.init();
  }

  render() {
    return this.wrapper.appendChild(this.list);
  }

  initListElement() {
    const list = this.render();
    const listItem = document.createElement('li');
    listItem.classList.add('list__item');
    return list.appendChild(listItem);
  }

  async initTable(params) {
    this.list.innerHTML = '';
    this.data = new Data();
    const allContries = await this.data.getCountryAllCountries();

    Object.values(allContries).forEach((item) => {
      const list = this.initListElement();
      const span = document.createElement('span');
      list.appendChild(span);

      this.img = document.createElement('img');
      list.appendChild(this.img);

      const obj = {
        confirmed: item.TotalConfirmed,
        deaths: item.TotalDeaths,
        recovered: item.TotalRecovered,
      };
      const Country = document.createTextNode(item.Country.toUpperCase());
      const TotalConfirmed = document.createTextNode(`${obj[params]}`);

      list.appendChild(Country);
      span.appendChild(TotalConfirmed);
    });

    this.choiceLine();
    this.setAllFlags();
  }

  async getAllFlags() {
    const flagArray = {};
    const url = 'https://restcountries.eu/rest/v2/all';
    const response = await fetch(url, this.requestOptions);
    const resultData = await response.json();
    resultData.forEach((elem) => {
      flagArray[elem.name.toUpperCase()] = elem.flag;
    });
    return flagArray;
  }

  async setAllFlags() {
    const getFlags = await this.getAllFlags();
    [...this.list.childNodes].forEach((item) => {
      item.firstChild.nextSibling.setAttribute('src', `${getFlags[item.lastChild.textContent]}`);
    });
    this.sortList();
    this.executeSearch();
    this.keyboardSearch();
  }

  sortList() {
    const sorted = [...this.list.childNodes]
      .sort((a, b) => b.firstChild.innerText - a.firstChild.innerText);
    this.list.innerHTML = '';

    // eslint-disable-next-line no-restricted-syntax
    for (const li of sorted) {
      this.list.appendChild(li);
    }
  }

  choiceLine() {
    const list = this.render();
    list.addEventListener('click', (event) => {
      const { target } = event;
      if (target.tagName !== 'LI') return;
      this.highlight(target);
    });
  }

  highlight(target) {
    if (selectedList) {
      selectedList.classList.remove('list-active');
    }
    selectedList = target;
    const dupNode = target.cloneNode(true);
    this.transferValue(dupNode);
    selectedList.classList.add('list-active');
  }

  executeSearch() {
    this.search.oninput = () => {
      this.displaySearchResult();
    };
  }

  keyboardSearch() {
    const cursor = document.querySelector('.search');
    cursor.addEventListener('focus', () => {
      this.displaySearchResult();
    });
  }

  displaySearchResult() {
    const regexp = /\D+/gm;
    const element = [...this.list.childNodes].find((item) => item.textContent
      .match(regexp)
      .join('')
      .toLocaleLowerCase()
      .includes(`${this.search.value.toLocaleLowerCase()}`));
    if (element) {
      this.list.prepend(element);
      this.highlight(element);
    }

    if (this.search.value.length === 0) {
      this.sortList();
    }
  }

  rerender(state, value) {
    switch (value) {
      case 'deaths':
        this.initTable('deaths');
        break;
      case 'cases':
        this.initTable('confirmed');
        break;
      case 'recovered':
        this.initTable('recovered');
        break;
      default:
    }
  }

  // eslint-disable-next-line class-methods-use-this
  transferValue() {
    // this.TableGD.initListItem(item);
  }
}

export default List;
