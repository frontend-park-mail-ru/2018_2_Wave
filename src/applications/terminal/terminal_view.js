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


  processInput() {
    if (!this.input) return null;
    const { value } = this.input;

    return value;
  }


  printString(string) {
    if (!this.rendered) this.render();

    this.terminal.innerHTML += messageTemplate({ string });
  }


  addInput(intro) {
    if (!this.rendered) this.render();

    this.terminal.innerHTML += inputTemplate({ intro });
    [this.input] = this.terminal.getElementsByClassName('terminal__input');
    this.input.focus();
    this.input.select();
  }
}


export default TerminalView;
