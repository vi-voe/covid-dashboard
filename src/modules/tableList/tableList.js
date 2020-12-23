import Data from '../data/DataGlobal';

class TableList {
  constructor(table) {
    this.table = table.table;
    this.data = new Data();

    this.peopleWorld = 7827000000;

    this.countMethod = 'true'; // abs, 100thousand
    this.period = 'true'; // total, day
    this.country = '';
  }

  async getDataForTable() {
    this.countries = await this.data.getCountryAllCountries();
    return this.countries;
  }

  putDatatoTable(res) {
    this.table.innerHTML = `
    <th>Country</th>
    <th>Cases</th>
    <th>Deaths</th>
    <th>Recovered</th>
  `;
    Object.values(res).forEach((item) => {
      if (this.country.length > 0 && item.Country.toLowerCase() !== this.country.toLowerCase()) return;
      const tr = document.createElement('tr');
      const confirmed = (this.period === 'true') ? item.TotalConfirmed : item.NewConfirmed;
      const deaths = (this.period === 'true') ? item.TotalDeaths : item.NewDeaths;
      const recovered = (this.period === 'true') ? item.TotalRecovered : item.NewRecovered;
      tr.innerHTML = `
        <td>${item.Country}</td>
        <td>${(this.countMethod === 'true') ? confirmed : Math.round((confirmed * 100000) / this.peopleWorld)}</td>
        <td>${(this.countMethod === 'true') ? deaths : Math.round((deaths * 100000) / this.peopleWorld)}</td>
        <td>${(this.countMethod === 'true') ? recovered : Math.round((recovered * 100000) / this.peopleWorld)}</td>
      `;
      this.table.appendChild(tr);
    });
  }

  render() {
    this.getDataForTable().then((res) => this.putDatatoTable(res));
  }

  rerender(state, value) {
    this[state] = value;
    this.render();
  }
}

export default TableList;
