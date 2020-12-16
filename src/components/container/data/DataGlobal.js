class Data {
  constructor() {
  }
  static async getData(value) {
    let url = 'https://api.covid19api.com/summary';
    let response = await fetch(url);
    let resultData = await response.json();
    return await resultData[value]

  }
  static async getPromiseValue(mainStatObj, objValue) {
    let promise = await Promise.resolve(Data.getData(mainStatObj));
    return await promise[objValue]
  }
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
}

