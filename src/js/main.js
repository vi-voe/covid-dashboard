import Container from '../components/container/container';
import CanvasChart from '../components/chart/chart';

// render container
const container = new Container();
container.render();

// render container
const canvasChart = new CanvasChart();
canvasChart.render();

const config = {
  type: 'bar',
  data: {
    labels: ['Group 1', 'Group 2'],
    datasets: [{
      label: 'Groups',
      data: [{
        x: new Date(),
        y: 1,
      }, {
        t: new Date(),
        y: 10,
      }],
    }],
    options: {
      xAxes: [{
        type: 'time',
        time: {
          unit: 'month',
        },
      }],
      yAxes: [{
        stacked: true,
        ticks: 'data',
      }],
    },
  },
};

const covidChart = new Chart(canvasChart.canvas.getContext('2d'), config);
