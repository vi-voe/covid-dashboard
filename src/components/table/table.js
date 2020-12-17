import './table.scss';
import Data from '../../modules/data/DataGlobal';

class Table {
  constructor() {
    this.table = document.createElement('table');
    this.table.classList.add('table');
  }

  render() {
    return document.body.appendChild(this.table);
  }

  async getData() {
    this.data = new Data();
    const allContries = await this.data.globalCountries();
    // for (let index = 0; index < 1; index += 1) {
    //   const x = await this.data.globalCountByCountry(index);
    //   const y = await this.data.getCountry(index);
    //   console.log(x, y);
    // }
    return allContries;
  }

  async countriesList() {
    const countriesList = await this.getData();
    console.log(countriesList)

    const table = this.render();
    console.log(table);
  }
}

export default Table;
