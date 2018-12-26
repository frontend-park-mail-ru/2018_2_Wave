import Element from '../element';

import terminalTemplate from './templates/terminal.pug';
import messageTemplate from './templates/message.pug';
import textblockTemplate from './templates/textblock.pug';
import inputTemplate from './templates/input.pug';

import './styles/terminal.pcss';


class TerminalView extends Element {
  constructor(parent) {
    super(terminalTemplate, parent);
  }

  render() {
    if (this.rendered) return;
    super.render();
    [this.terminal] = this.wrapper.getElementsByClassName('terminal');
  }


  /*  simple rendering methods  */
  clear() {
    this.terminal.innerHTML = '';
  }

  printString(string) {
    if (!this.rendered) this.render();
    const empty = !string || string === '';

    this.terminal.innerHTML += messageTemplate(
      { string: empty ? '' : string },
    );
  }

  printBlock(text) {
    if (!text) return;
    if (!this.rendered) this.render();

    this.terminal.innerHTML += textblockTemplate({ text });
  }

  /*  working with inputs  */
  getInput() {
    if (this.input) return this.input;
    [this.input] = this.terminal.getElementsByClassName('terminal__input');
    if (!this.input) return null;
    return this.input;
  }

  processInput() {
    if (!this.input) return null;
    const { value } = this.input;
    const attr = this.input.getAttribute('type');
    let newValue = '';
    if (attr === 'password') {
      let { length } = value;
      while (length--) {
        newValue += '•';
      }
    } else newValue = value;
    const line = this.input.parentElement;

    line.removeChild(this.input);
    line.innerHTML += messageTemplate({ string: newValue });

    this.input = null;
    return value;
  }

  addInput(intro) {
    if (!this.rendered) this.render();

    this.terminal.innerHTML += inputTemplate({ intro });
    this.focusInput();
  }

  setInput(value) {
    if (!this.input) {
      [this.input] = this.terminal.getElementsByClassName('terminal__input');
    }
    this.input.value = value;
  }

  addPasswordInput(intro) {
    if (!this.rendered) this.render();

    this.terminal.innerHTML += inputTemplate({ intro });
    this.getInput().setAttribute('type', 'password');
    this.focusInput();
  }

  focusInput() {
    [this.input] = this.terminal.getElementsByClassName('terminal__input');
    this.input.focus();
  }
}


export default TerminalView;
