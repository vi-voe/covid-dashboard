import Data from '../data/DataGlobal';

class ChartPainter {
  constructor(canvasChart) {
    this.canvas = canvasChart;
    this.data = new Data();

    this.group = 'cases'; // cases, deaths? recovered
    this.countMethod = 'ABS'; // abs, 100thousand
    this.period = 'total'; // total, day

    this.peopleWorld = 7827000000;

    this.cfg = {
      data: {
        datasets: [{
          label: 'People: ',
          backgroundColor: '#ffe35c',
          borderColor: '#ffe35c',
          data: [],
          type: 'bar',
          pointRadius: 0,
          fill: false,
          lineTension: 0,
        }],
      },
      options: {
        animation: {
          duration: 0,
        },
        scales: {
          xAxes: [{
            type: 'time',
            distribution: 'linear',
            offset: true,
            ticks: {
              major: {
                enabled: true,
                fontStyle: 'bold',
              },
              source: 'data',
              autoSkip: true,
              autoSkipPadding: 50,
              maxRotation: 0,
              sampleSize: 0,
            },
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
            },
          }],
        },
        tooltips: {
          intersect: false,
          mode: 'x',
          callbacks: {
            label(tooltipItem, myData) {
              let label = myData.datasets[tooltipItem.datasetIndex].label || '';
              if (label) {
                label += ': ';
              }
              label += parseFloat(tooltipItem.value).toFixed(2);
              return label;
            },
          },
        },
      },
    };
    this.chart = new Chart(this.canvas.canvas.getContext('2d'), this.cfg);
  }

  async getDataForChart() {
    const dataChartArray = [];
    await this.data.getDataTotalCasesGlobalHistorical().then((res) => {
      let prev = 0;
      Object.entries(res[this.group]).forEach((pair) => {
        let people = (this.period === 'total') ? pair[1] : pair[1] - prev;
        prev = pair[1];
        people = (this.countMethod === 'ABS') ? people : Math.round((people * 100000) / this.peopleWorld);
        dataChartArray.push({ t: pair[0].valueOf(), y: people });
      });
    }).catch((error) => console.error(error));
    return dataChartArray;
  }

  updateChart(dataResult) {
    this.cfg.data.datasets[0].data = dataResult;
    this.cfg.data.datasets[0].label = `People ${this.group}`;
    this.chart.update();
  }

  render() {
    this.getDataForChart().then((dataResult) => this.updateChart(dataResult));
  }

  rerender(state, value) {
    this[state] = value;
    this.render();
  }
}

export default ChartPainter;
