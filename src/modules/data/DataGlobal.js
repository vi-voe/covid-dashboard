class Data {
  static async getData(value) {
    this.requestOptions = {
      Server: 'nginx/1.14.0 (Ubuntu)',
      'Content-Type': 'application/json; charset=UTF-8',
      'Transfer-Encoding': 'chunked',
      Connection: 'keep-alive',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Expose-Headers': 'Content-Length',
      'Content-Encoding': 'gzip',
      'Strict-Transport-Security': 'max-age=5184000; includeSubDomains',
      Vary: 'Origin',
      'X-Content-Type-Options': 'nosniff',
      'X-Dns-Prefetch-Control': 'off',
      'X-Download-Options': 'noopen',
      'X-Frame-Options': 'DENY',
      'X-Rate-Limit-Duration': 1,
      'X-Rate-Limit-Limit': 3.00,
      'X-Rate-Limit-Request-Remote-Addr': '127.0.0.1:60412',
      'X-Request-Id': '0ea87bc5-7d92-416c-84c7-94028b7c7de2',
      'X-Xss-Protection': '1; mode=block',
      'X-Access-Token': '5cf9dfd5-3449-485e-b5ae-70a60e997864',
    };
    const url = 'https://api.covid19api.com/summary?apikey=5cf9dfd5-3449-485e-b5ae-70a60e997864';
    const response = await fetch(url, this.requestOptions);
    const resultData = await response.json();
    return resultData[value];
  }

  static async getPopulationAndFlag(name, allCountry) {
    const url = 'https://restcountries.eu/rest/v2/all?fields=name;population;flag';
    const response = await fetch(url, this.requestOptions);
    const resultData = await response.json();
    if (allCountry === 'All') {
      return resultData.filter((el) => el.name === name).map((res) => res.flag);
    }
    return resultData.filter((el) => el.name === name);
  }

  static async getPromiseValue(mainStatObj, objValue, objValueCountry) {
    const promise = await Promise.resolve(Data.getData(mainStatObj));
    if (objValueCountry !== undefined && objValue !== 'All') {
      return promise[objValue][objValueCountry];
    }
    if (objValue === 'All') {
      if (objValueCountry === undefined) {
        return promise;
      }
      if (objValueCountry !== undefined) {
        return promise.map((e) => e[objValueCountry]);
      }
    }
    return promise[objValue];
  }

  // global stat

  async globalCount() {
    this.globalCountResult = await Data.getPromiseValue('Global', 'TotalConfirmed');
    return this.globalCountResult;
  }

  async totalDeaths() {
    this.totalDeathsResult = await Data.getPromiseValue('Global', 'TotalDeaths');
    return this.totalDeathsResult;
  }

  async totalRecovered() {
    this.totalRecoveredResult = await Data.getPromiseValue('Global', 'TotalRecovered');
    return this.totalRecoveredResult;
  }

  async globalCountBy100K() {
    this.globalCountBy100KResult = await Data.getPromiseValue('Global', 'TotalConfirmed').then((res) => Math.round(res / (7827000000 * 100000)));
    return this.globalCountBy100KResult;
  }

  async totalDeathsBy100K() {
    this.totalDeathsBy100KResult = await Data.getPromiseValue('Global', 'TotalDeaths').then((res) => Math.round(res / (7827000000 * 100000)));
    return this.totalDeathsBy100KResult;
  }

  async totalRecoveredBy100K() {
    this.totalRecoveredBy100KResult = await Data.getPromiseValue('Global', 'TotalRecovered').then((res) => Math.round(res / (7827000000 * 100000)));
    return this.totalRecoveredBy100KResult;
  }

  // global historical stat

  async getDataTotalCasesGlobalHistorical() {
    const url = 'https://disease.sh/v3/covid-19/historical/all?lastdays=366';
    const response = await fetch(url);
    this.resultData = await response.json();
    return this.resultData;
  }

  async getDataTotalCasesCountryHistorical(value) {
    const url = `https://disease.sh/v3/covid-19/historical/${value}?lastdays=366`;
    const response = await fetch(url);
    this.resultData = await response.json();
    return this.resultData;
  }

  // stat by last day

  async lastDayCount() {
    this.lastDayCountResult = await Data.getPromiseValue('Global', 'NewConfirmed');
    return this.lastDayCountResult;
  }

  async lastDayDeaths() {
    this.lastDayDeathsResult = await Data.getPromiseValue('Global', 'NewDeaths');
    return this.lastDayDeathsResult;
  }

  async lastDayRecovered() {
    this.lastDayRecoveredResult = await Data.getPromiseValue('Global', 'NewRecovered');
    return this.lastDayRecoveredResult;
  }

  async lastDayCountBy100K() {
    this.lastDayCountBy100KResult = await Data.getPromiseValue('Global', 'NewConfirmed').then((res) => Math.round(res / (7827000000 * 100000)));
    return this.lastDayCountBy100KResult;
  }

  async lastDayDeathsBy100K() {
    this.lastDayDeathsBy100KResult = await Data.getPromiseValue('Global', 'NewDeaths').then((res) => Math.round(res / (7827000000 * 100000)));
    return this.lastDayDeathsBy100KResult;
  }

  async lastDayRecoveredBy100K() {
    this.lastDayRecoveredBy100KResult = await Data.getPromiseValue('Global', 'NewRecovered').then((res) => Math.round(res / (7827000000 * 100000)));
    return this.lastDayRecoveredBy100KResult;
  }

  // global stat by country

  async globalCountByCountry(numCountry) {
    this.globalCountByCountryResult = await Data.getPromiseValue('Countries', numCountry, 'TotalConfirmed');
    return this.globalCountByCountryResult;
  }

  async totalDeathsByCountry(numCountry) {
    this.totalDeathsByCountryResult = await Data.getPromiseValue('Countries', numCountry, 'TotalDeaths');
    return this.totalDeathsByCountryResult;
  }

  async totalRecoveredByCountry(numCountry) {
    this.totalRecoveredByCountryResult = await Data.getPromiseValue('Countries', numCountry, 'TotalRecovered');
    return this.totalRecoveredByCountryResult;
  }

  async globalCountBy100KByCountry(numCountry) {
    this.globalCountBy100KByCountryResult = await Data.getPromiseValue('Countries', numCountry, 'TotalConfirmed')
      .then(() => this.getCountry(numCountry))
      .then((res) => Data.getPopulationAndFlag(res))
      .then(async (res) => {
        const result = await Data.getPromiseValue('Countries', numCountry, 'TotalConfirmed').then((countCovid) => Math.round(countCovid / (res[0].population * 100000)));
        return result;
      });
    return this.globalCountBy100KByCountryResult;
  }

  async totalDeathsBy100KByCountry(numCountry) {
    this.totalDeathsBy100KByCountryResult = await Data.getPromiseValue('Countries', numCountry, 'TotalDeaths')
      .then(() => this.getCountry(numCountry))
      .then((res) => Data.getPopulationAndFlag(res))
      .then(async (res) => {
        const result = await Data.getPromiseValue('Countries', numCountry, 'TotalDeaths')
          .then((countCovid) => Math.round(countCovid / (res[0].population * 100000)));
        return result;
      });
    return this.totalDeathsBy100KByCountryResult;
  }

  async totalRecoveredBy100KByCountry(numCountry) {
    this.totalRecoveredBy100KByCountryResult = await Data.getPromiseValue('Countries', numCountry, 'TotalRecovered')
      .then(() => this.getCountry(numCountry))
      .then((res) => Data.getPopulationAndFlag(res))
      .then(async (res) => {
        const result = await Data.getPromiseValue('Countries', numCountry, 'TotalRecovered')
          .then((countCovid) => Math.round(countCovid / (res[0].population * 100000)));
        return result;
      });
    return this.totalRecoveredBy100KByCountryResult;
  }

  // last day stat by country

  async lastDayGlobalCountByCountry(numCountry) {
    this.lastDayGlobalCountByCountryResult = await Data.getPromiseValue('Countries', numCountry, 'NewConfirmed');
    return this.lastDayGlobalCountByCountryResult;
  }

  async lastDayTotalDeathsByCountry(numCountry) {
    this.lastDayTotalDeathsByCountryResult = await Data.getPromiseValue('Countries', numCountry, 'NewDeaths');
    return this.lastDayTotalDeathsByCountryResult;
  }

  async lastDayTotalRecoveredByCountry(numCountry) {
    this.lastDayTotalRecoveredByCountryResult = await Data.getPromiseValue('Countries', numCountry, 'NewRecovered');
  }

  async lastDayGlobalCountBy100KByCountry(numCountry) {
    this.lastDayGlobalCountBy100KByCountryResult = await Data.getPromiseValue('Countries', numCountry, 'NewConfirmed')
      .then(() => this.getCountry(numCountry))
      .then((res) => Data.getPopulationAndFlag(res))
      .then(async (res) => {
        const result = await Data.getPromiseValue('Countries', numCountry, 'NewConfirmed')
          .then((countCovid) => Math.round(countCovid / (res[0].population * 100000)));
        return result;
      });
  }

  async lastDayTotalDeathsBy100KByCountry(numCountry) {
    this.lastDayTotalDeathsBy100KByCountryResult = await Data.getPromiseValue('Countries', numCountry, 'NewDeaths')
      .then(() => this.getCountry(numCountry))
      .then((res) => Data.getPopulationAndFlag(res))
      .then(async (res) => {
        const result = await Data.getPromiseValue('Countries', numCountry, 'NewDeaths')
          .then((countCovid) => Math.round(countCovid / (res[0].population * 100000)));
        return result;
      });
  }

  async lastDayTotalRecoveredBy100KByCountry(numCountry) {
    this.lastDayTotalRecoveredBy100KByCountryResult = await Data.getPromiseValue('Countries', numCountry, 'NewRecovered')
      .then(() => this.getCountry(numCountry))
      .then((res) => Data.getPopulationAndFlag(res))
      .then(async (res) => {
        const result = await Data.getPromiseValue('Countries', numCountry, 'NewRecovered')
          .then((countCovid) => Math.round(countCovid / (res[0].population * 100000)));
        return result;
      });
  }

  // other info (country, country code, slug, date, flag)

  async getCountry(numCountry) {
    this.getCountryResult = await Data.getPromiseValue('Countries', numCountry, 'Country');
    return this.getCountryResult;
  }

  async getCountryCode(numCountry) {
    this.getCountryCodeResult = await Data.getPromiseValue('Countries', numCountry, 'CountryCode');
    return this.getCountryCodeResult;
  }

  async getCountrySlug(numCountry) {
    this.getCountrySlugResult = await Data.getPromiseValue('Countries', numCountry, 'Slug');
    return this.getCountrySlugResult;
  }

  async getDate(numCountry) {
    this.getDateResult = await Data.getPromiseValue('Countries', numCountry, 'Date');
    return this.getDateResult;
  }

  async getFlag(numCountry) {
    this.getFlagResult = await this.getCountry(numCountry)
      .then((res) => Data.getPopulationAndFlag(res)).then((res) => res[0].flag);
    return this.getFlagResult;
  }

  async getCountryAllCountries() {
    this.getCountryAllCountriesResult = await Data.getPromiseValue('Countries', 'All');
    return this.getCountryAllCountriesResult;
  }

  async getCountryCodeAllCountries() {
    this.getCountryCodeAllCountriesResult = await Data.getPromiseValue('Countries', 'All', 'CountryCode');
    return this.getCountryCodeAllCountriesResult;
  }

  async getCountrySlugAllCountries() {
    this.getCountrySlugAllCountriesResult = await Data.getPromiseValue('Countries', 'All', 'Slug');
    return this.getCountrySlugAllCountriesResult;
  }

  async getDateAllCountries() {
    this.getDateAllCountriesResult = await Data.getPromiseValue('Countries', 'All', 'Date');
    return this.getDateAllCountriesResult;
  }

  async getFlagAllCountries() {
    this.getFlagResult = await this.getCountryAllCountries()
      .then((result) => result.map((res) => Data.getPopulationAndFlag(res.Country, 'All')))
      .then((res) => res);
    return this.getFlagResult;
  }
}
export default Data;
