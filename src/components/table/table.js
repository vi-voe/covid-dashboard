import './table.scss';
import tableHeader from './var';
import Data from '../../modules/data/DataGlobal';
import TableGlobalDeath from './TableGlobalDeath';

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

    this.search = document.createElement('input');
    this.search.setAttribute('type', 'text');
    this.search.setAttribute('placeholder', 'Search');
    this.search.classList.add('search');
    this.wrapper.appendChild(this.search);

    const textContent = document.createTextNode(tableHeader);
    listHeader.appendChild(textContent);

    this.TableGD = new TableGlobalDeath();
    this.TableGD.render();

    document.getElementById('top').appendChild(this.wrapper);
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

  async initTableTotalConfirmed() {
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
    this.sortList();
    this.executeSearch();
  }

  async initTableRecovered() {
    const allContries = await this.data.getCountryAllCountries();
    Object.values(allContries).forEach((item) => {
      const list = this.initListItem();
      const span = document.createElement('span');
      list.appendChild(span);

      const Country = document.createTextNode(item.Country.toUpperCase());
      const TotalRecovered = document.createTextNode(item.TotalRecovered);

      list.appendChild(Country);
      span.appendChild(TotalRecovered);
    });
  }

  async initTableTotalDeaths() {
    const allContries = await this.data.getCountryAllCountries();
    Object.values(allContries).forEach((item) => {
      const list = this.initListItem();
      const span = document.createElement('span');
      list.appendChild(span);

      const Country = document.createTextNode(item.Country.toUpperCase());
      const TotalDeaths = document.createTextNode(item.TotalDeaths);

      list.appendChild(Country);
      span.appendChild(TotalDeaths);
    });
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

  executeSearch() {
    const regexp = /\D+/gm;
    this.search.oninput = () => {
      const element = [...this.list.childNodes].find((item) => item.textContent
        .match(regexp)
        .join('')
        .toLocaleLowerCase()
        .includes(`${this.search.value.toLocaleLowerCase()}`));

      if (element) {
        this.list.prepend(element);
      }

      if (this.search.value.length === 0) {
        this.sortList();
      }
    };
  }

  highlight(td) {
    if (selectedList) {
      selectedList.classList.remove('list-active');
    }
    selectedList = td;
    const dupNode = td.cloneNode(true);
    this.transferValue(dupNode);
    selectedList.classList.add('list-active');
  }

  transferValue(item) {
    this.TableGD.initListItem(item);
  }
}

export default Table;
