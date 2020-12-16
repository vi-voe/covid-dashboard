import './chart.scss';

class CanvasChart {
  constructor() {
    this.chart = document.createElement('div');
    this.chart.classList.add('chart-wrap');
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'chart';

    this.chart.appendChild(this.canvas);
  }

  render() {
    document.querySelector('.container').appendChild(this.chart);
  }
}

export default CanvasChart;
