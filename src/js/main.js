import Container from '../components/container/container';
import CanvasChart from '../components/chart/chart';

import ChartPainter from '../modules/chart/chart';

// render container
const container = new Container();
container.render();

// render chart
const canvasChart = new CanvasChart();
canvasChart.render();

const chartPainter = new ChartPainter(canvasChart);
chartPainter.render();
setTimeout(()=>{chartPainter.rerender('countMethod', 'thousend')}, 2000)
setTimeout(()=>{chartPainter.rerender('group', 'deaths')}, 5000)
setTimeout(()=>{chartPainter.rerender('countMethod', 'ABS')}, 8000)
