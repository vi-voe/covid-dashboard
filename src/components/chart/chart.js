import Trigger from '../trigger/trigger';
import Tabs from '../tabs/tabs';
import ResizeBtn from '../resize-btn/resizeBtn';
import './chart.scss';

class CanvasChart {
  constructor() {
    this.chart = document.createElement('div');
    this.chart.classList.add('chart-wrap');
    this.chart.classList.add('resize-bl');
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'chart';

    const triggerWrap = document.createElement('div');
    triggerWrap.classList.add('trigger-wrap');

    this.trigger = new Trigger('trigger1', 'countMethod', ['total', '100k']);
    this.trigger.render(triggerWrap);

    this.trigger2 = new Trigger('trigger2', 'period', ['total', 'daily']);
    this.trigger2.render(triggerWrap);

    this.chart.appendChild(triggerWrap);


    this.resizeBtn = new ResizeBtn();
    this.resizeBtn.render(this.chart);

    this.chart.appendChild(this.canvas);

    this.tabs = new Tabs('group', ['cases', 'deaths', 'recovered']);
    this.tabs.render(this.chart);
  }

  render() {
    document.getElementById('bottom').appendChild(this.chart);
  }
}

export default CanvasChart;
