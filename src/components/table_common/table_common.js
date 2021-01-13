import './table_common.scss';
import Trigger from '../trigger/trigger';
import ResizeBtn from '../resize-btn/resizeBtn';

class TableCommon {
  constructor() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('table_wrap');
    this.wrapper.classList.add('resize-bl');
    this.tableInner = document.createElement('div');
    this.tableInner.classList.add('table-inner');
    this.table = document.createElement('table');
    this.table.classList.add('table');

    const tableHeader = document.createElement('tr');
    tableHeader.innerHTML = `
      <th>Country</th>
      <th>Cases</th>
      <th>Deaths</th>
      <th>Recovered</th>
    `;
    this.table.appendChild(tableHeader);

    const triggerWrap = document.createElement('div');
    triggerWrap.classList.add('trigger-wrap');

    this.trigger = new Trigger('trigger3', 'countMethod', ['total', '100k']);
    this.trigger.render(triggerWrap);

    this.trigger2 = new Trigger('trigger4', 'period', ['total', 'daily']);
    this.trigger2.render(triggerWrap);

    this.resizeBtn = new ResizeBtn();
    this.resizeBtn.render(this.wrapper);

    this.wrapper.appendChild(triggerWrap);
    this.wrapper.appendChild(this.tableInner);
    this.tableInner.appendChild(this.table);
  }

  render() {
    document.getElementById('bottom').appendChild(this.wrapper);
  }
}

export default TableCommon;
