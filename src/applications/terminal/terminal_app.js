import TerminalView from './terminal_view';
import BaseApp from '../base_app';


class TerminalApp extends BaseApp {
  constructor(url, parent) {
    super(url, parent, TerminalView);

    this.intro = 'stanford@rasseki:~/$';

    this.listeners = {
      keydown: this.handleKeypress.bind(this),
      click: this.focusInput.bind(this),
    };

    this.commands = {
      help: this.help,
      history: this.history,
      clear: this.clear,
    };

    this.commandHistory = [];
  }

  get view() {
    // this app has only one view
    // and this is current
    return this.currentView;
  }

  /**  terminal DOM element  */
  get terminal() {
    return this.view.terminal;
  }


  /*   service methods   */
  start() {
    super.start();
    this.addListeners();
    this.view.printString('Hello!');
    this.view.addInput(this.intro);
  }

  stop() {
    super.stop();
    this.removeListeners();
    this.commandHistory = [];
  }

  pause() {
    super.pause();
    this.removeListeners();
  }

  resume() {
    super.resume();
    this.addListeners();
  }


  /*   terminal commands   */
  help() {
    Object.keys(this.commands).forEach((key) => {
      this.view.printString(key);
    });
  }

  history() {
    this.commandHistory.forEach((command) => {
      this.view.printString(` * ${command}`);
    });
  }

  clear() {
    this.view.clear();
  }


  /*   handlers and listeners   */
  handleKeypress(ev) {
    switch (ev.keyCode) {
      case 13:  // enter
        ev.preventDefault();
        this.handleCommand();
        break;
      default:
        break;
    }
  }

  /**  reads and process command from input  */
  handleCommand() {
    const command = this.view.processInput();

    if (command) {
      if (this.commands.hasOwnProperty(command)) {
        this.commands[command].call(this);
      } else {
        this.view.printString();
        this.view.printString(`${command}: command not found`);
        this.view.printString();
      }
      this.commandHistory.push(command);
    }
    this.view.addInput(this.intro);
  }


  focusInput() {
    console.log('focusing!');
    const input = this.view.getInput();
    if (input) {
      input.focus();
    }
  }

  addListeners() {
    Object.keys(this.listeners).forEach((key) => {
      // FIXME:
      document./*this.terminal.*/addEventListener(key, this.listeners[key]);
    });
  }

  removeListeners() {
    Object.keys(this.listeners).forEach((key) => {
      // FIXME:
      document./*this.terminal.*/removeEventListener(key, this.listeners[key]);
      
    });
  }
}


export default TerminalApp;
