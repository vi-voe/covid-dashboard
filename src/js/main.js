import Container from '../components/container/container';
import CanvasChart from '../components/chart/chart';
import List from '../components/list/list';

import ChartPainter from '../modules/chart/chart';
import { publisher } from '../modules/observer/publisher';

// render container
const container = new Container();
container.render();

// table
const list = new List();
list.initTable('confirmed');

// render chart
const canvasChart = new CanvasChart();
canvasChart.render();

const chartPainter = new ChartPainter(canvasChart);
chartPainter.render();

publisher.subscribe(chartPainter, "group");
publisher.subscribe(chartPainter, "countMethod");
publisher.subscribe(chartPainter, "period");

publisher.subscribe(list, "group");
publisher.subscribe(list, "countMethod");
publisher.subscribe(list, "period");
