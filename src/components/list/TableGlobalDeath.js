import './TableGlobalDeath.scss';
import Data from '../../modules/data/DataGlobal';

class TableGlobalDeath {
  constructor() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('globaldeath_wrap');

    this.itemList = document.createElement('ul');
    this.itemList.classList.add('list_container');

    const listHeader = document.createElement('h2');
    listHeader.classList.add('list__title');
    this.wrapper.appendChild(listHeader);
    const textContent = document.createTextNode('Global Death');
    listHeader.appendChild(textContent);

    const globalDeath = document.createElement('h3');
    globalDeath.classList.add('list__subtitle');
    this.wrapper.appendChild(globalDeath);

    this.initGlobalDeathStat().then((value) => {
      const globalDeathTextContent = document.createTextNode(value);
      globalDeath.appendChild(globalDeathTextContent);
    });

    // document.querySelector('.container').appendChild(this.wrapper);
  }

  render() {
    return this.wrapper.appendChild(this.itemList);
  }

  initListItem(item) {
    this.itemList.innerHTML = '';
    const elem = item;
    return this.itemList.appendChild(elem);
  }

  async initGlobalDeathStat() {
    this.data = await new Data();
    const global = await this.data.totalDeaths();
    return global;
  }
}

export default TableGlobalDeath;
