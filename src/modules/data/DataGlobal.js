export class Data {
  constructor() {
  }
  static async getData(value) {
    let url = 'https://api.covid19api.com/summary';
    let response = await fetch(url);
    let resultData = await response.json();
    return await resultData[value]

  }
  static async getPromiseValue(mainStatObj, objValue, objValueCountry) {
    let promise = await Promise.resolve(Data.getData(mainStatObj));
    if(objValueCountry !== undefined) {
    return await promise[objValue][objValueCountry]
    }
    return await promise[objValue]
  }

  //global stat

  async globalCount() {
    return await Data.getPromiseValue('Global', 'TotalConfirmed')
  }
  async totalDeaths() {
    return await Data.getPromiseValue('Global', 'TotalDeaths')
  }
  async totalRecovered() {
    return await Data.getPromiseValue('Global', 'TotalRecovered')
  }
  async globalCountBy100K() {
    return await Data.getPromiseValue('Global', 'TotalConfirmed').then(res => Math.round(res / 7827000000 * 100000))
  }
  async totalDeathsBy100K() {
    return await Data.getPromiseValue('Global', 'TotalDeaths').then(res => Math.round(res / 7827000000 * 100000))
  }
  async totalRecoveredBy100K() {
    return await Data.getPromiseValue('Global', 'TotalRecovered').then(res => Math.round(res / 7827000000 * 100000))
  }

  //stat by last day

  async lastDayCount() {
    return await Data.getPromiseValue('Global', 'NewConfirmed')
  }
  async lastDayDeaths() {
    return await Data.getPromiseValue('Global', 'NewDeaths')
  }
  async lastDayRecovered() {
    return await Data.getPromiseValue('Global', 'NewRecovered')
  }
  async lastDayCountBy100K() {
    return await Data.getPromiseValue('Global', 'NewConfirmed').then(res => Math.round(res / 7827000000 * 100000))
  }
  async lastDayDeathsBy100K() {
    return await Data.getPromiseValue('Global', 'NewDeaths').then(res => Math.round(res / 7827000000 * 100000))
  }
  async lastDayRecoveredBy100K() {
    return await Data.getPromiseValue('Global', 'NewRecovered').then(res => Math.round(res / 7827000000 * 100000))
  }

  //global stat by country

  async globalCountByCountry(numCountry) {
    return await Data.getPromiseValue(`Countries`, numCountry, 'TotalConfirmed')
  }
  async totalDeathsByCountry(numCountry) {
    return await Data.getPromiseValue(`Countries`, numCountry, 'TotalDeaths')
  }
  async totalRecoveredByCountry(numCountry) {
    return await Data.getPromiseValue(`Countries`, numCountry, 'TotalRecovered')
  }
  async globalCountBy100KByCountry(numCountry) {
    return await Data.getPromiseValue(`Countries`, numCountry, 'TotalConfirmed').then(res => Math.round(res / 7827000000 * 100000))
  }
  async totalDeathsBy100KByCountry(numCountry) {
    return await Data.getPromiseValue(`Countries`, numCountry, 'TotalDeaths').then(res => Math.round(res / 7827000000 * 100000))
  }
  async totalRecoveredBy100KByCountry(numCountry) {
    return await Data.getPromiseValue(`Countries`, numCountry, 'TotalRecovered').then(res => Math.round(res / 7827000000 * 100000))
  }

  //last day stat by country

  async lastDayGlobalCountByCountry(numCountry) {
    return await Data.getPromiseValue(`Countries`, numCountry, 'NewConfirmed')
  }
  async lastDayTotalDeathsByCountry(numCountry) {
    return await Data.getPromiseValue(`Countries`, numCountry, 'NewDeaths')
  }
  async lastDayTotalRecoveredByCountry(numCountry) {
    return await Data.getPromiseValue(`Countries`, numCountry, 'NewRecovered')
  }
  async lastDayGlobalCountBy100KByCountry(numCountry) {
    return await Data.getPromiseValue(`Countries`, numCountry, 'NewConfirmed').then(res => Math.round(res / 7827000000 * 100000))
  }
  async lastDayTotalDeathsBy100KByCountry(numCountry) {
    return await Data.getPromiseValue(`Countries`, numCountry, 'NewDeaths').then(res => Math.round(res / 7827000000 * 100000))
  }
  async lastDayTotalRecoveredBy100KByCountry(numCountry) {
    return await Data.getPromiseValue(`Countries`, numCountry, 'NewRecovered').then(res => Math.round(res / 7827000000 * 100000))
  }

  //other info (country, country code, slug, date)

  async getCountry(numCountry) {
    return await Data.getPromiseValue(`Countries`, numCountry, 'Country')
  }
  async getCountryCode(numCountry) {
    return await Data.getPromiseValue(`Countries`, numCountry, 'CountryCode')
  }
  async getCountrySlug(numCountry) {
    return await Data.getPromiseValue(`Countries`, numCountry, 'CountryCode')
  }
  async getDate(numCountry) {
    return await Data.getPromiseValue(`Countries`, numCountry, 'Date')
  }
}
