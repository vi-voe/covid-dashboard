import Container from '../components/container/container';
import CanvasChart from '../components/chart/chart';

import ChartPainter from '../modules/chart/chart';
import Table from '../components/table/table';

// render container
const container = new Container();
container.render();

// render chart
const canvasChart = new CanvasChart();
canvasChart.render();

const chartPainter = new ChartPainter(canvasChart);
chartPainter.render();

// table
const table = new Table();
table.initTableList();