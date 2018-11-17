import BaseView from '../../views/baseview';

import terminalTemplate from './templates/terminal.pug';
import messageTemplate from './templates/message.pug';
import inputTemplate from './templates/input.pug';

import './terminal.css';


class TerminalView extends BaseView {
  constructor(parent) {
    super(terminalTemplate, parent);
  }

  render() {
    if (this.rendered) return;
    super.render();
    [this.terminal] = this.wrapper.getElementsByClassName('terminal');
  }


  printString(string) {
    if (!this.rendered) this.render();

    this.terminal.innerHTML += messageTemplate({ string });
  }


  addInput(intro) {
    if (!this.rendered) this.render();

    this.terminal.innerHTML += inputTemplate({ intro });
    const [input] = this.terminal.getElementsByClassName('terminal__input');
    input.focus();
    input.select();
  }
}


export default TerminalView;
