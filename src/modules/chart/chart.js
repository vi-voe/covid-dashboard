import Data from '../data/DataGlobal';

class ChartPainter {
  constructor() {
    this.data = new Data();
  }

  async getDataForChart() {
    const dataChartArray = [];
    await this.data.getDataTotalCasesGlobalHistorical().then((res) => {
      Object.entries(res.cases).forEach((pair) => {
        dataChartArray.push({ t: pair[0].valueOf(), y: pair[1] });
      });
    }).catch((error) => console.error(error));
    return dataChartArray;
  }

  initChart(canvasChart, dataResult) {
    this.cfg = {
      data: {
        datasets: [{
          label: 'People: ',
          backgroundColor: '#ffe35c',
          borderColor: '#ffe35c',
          data: dataResult,
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
    this.chart = new Chart(canvasChart.canvas.getContext('2d'), this.cfg);
  }

  paint(canvasChart) {
    this.getDataForChart().then((dataResult) => this.initChart(canvasChart, dataResult));
  }
}

export default ChartPainter;
