import Container from '../components/container/container';
import CanvasChart from '../components/chart/chart';

// render container
const container = new Container();
container.render();

// render container
const canvasChart = new CanvasChart();
canvasChart.render();

function generateData() {
  return [
    { t: 631227600000, y: '29.89' },
    { t: 631400400000, y: '28.74' },
    { t: 631746000000, y: '27.35' },
    { t: 631918800000, y: '26.96' },
    { t: 632091600000, y: '28.22' },
    { t: 632350800000, y: '29.39' },
    { t: 632523600000, y: '27.24' },
    { t: 632696400000, y: '28.00' },
    { t: 632955600000, y: '30.20' },
  ];
}

const cfg = {
  data: {
    datasets: [{
      label: 'People: ',
      backgroundColor: '#ffe35c',
      borderColor: '#ffe35c',
      data: generateData(),
      type: 'bar',
      pointRadius: 0,
      fill: false,
      lineTension: 0,
      borderWidth: 2,
    }],
  },
  options: {
    animation: {
      duration: 0,
    },
    scales: {
      xAxes: [{
        type: 'time',
        distribution: 'series',
        offset: true,
        ticks: {
          major: {
            enabled: true,
            fontStyle: 'bold',
          },
          source: 'data',
          autoSkip: true,
          autoSkipPadding: 25,
          maxRotation: 0,
          sampleSize: 100,
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
const covidChart = new Chart(canvasChart.canvas.getContext('2d'), cfg);
