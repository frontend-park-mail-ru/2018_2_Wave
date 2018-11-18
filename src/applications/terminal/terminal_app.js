import TerminalView from './terminal_view';

class TerminalApp {
  constructor() {
    this.view = new TerminalView(document.body);  // FIXME:

    this.listeners = {
      keydown: this.handle,
    };

    this.commands = {
      help: this.help,
      history: this.history,
      clear: this.clear,
    };

    this.commandHistory = [];

    this.intro = 'stanford@rasseki:~/$';
  }


  handle(ev) {
    switch (ev.keyCode) {
      case 13:  // enter
        ev.preventDefault();
        this.handleCommand();
        break;
      default:
        break;
    }
  }


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


  /*  terminal commands  */
  help() {
    Object.keys(this.commands).forEach((key) => {
      this.view.printString(key);
    });
  }

  history() {
    this.commandHistory.forEach((command) => {
      this.view.printString(`* ${command}`);
    });
  }

  clear() {
    this.view.clear();
  }


  /*  service methods  */
  start() {
    this.view.show();
    this.view.printString('Hello!');
    this.view.addInput(this.intro);
    Object.keys(this.listeners).forEach((key) => {
      document.addEventListener(key, this.listeners[key].bind(this));
    });
  }

  stop() {
    Object.keys(this.listeners).forEach((key) => {
      document.removeEventListener(key, this.listeners[key].bind(this));
    });
  }
}


export default TerminalApp;
