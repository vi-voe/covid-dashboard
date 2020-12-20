import Container from '../components/container/container';
import CanvasChart from '../components/chart/chart';
import Table from '../components/table/table';

import ChartPainter from '../modules/chart/chart';
import { publisher } from '../modules/observer/publisher';

// render container
const container = new Container();
container.render();

// table
const table = new Table();
table.initTableTotalConfirmed();

// render chart
const canvasChart = new CanvasChart();
canvasChart.render();

const chartPainter = new ChartPainter(canvasChart);
chartPainter.render();

publisher.subscribe(chartPainter, "group");
publisher.subscribe(chartPainter, "countMethod");
publisher.subscribe(chartPainter, "period");
