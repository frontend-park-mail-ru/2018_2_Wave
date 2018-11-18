import TerminalView from './terminal_view';


class TerminalApp {
  constructor(parent) {
    this.parent = parent;
    this.view = new TerminalView(parent);

    this.intro = 'stanford@rasseki:~/$';

    this.listeners = {
      keydown: this.handleKeypress,
    };

    this.commands = {
      help: this.help,
      history: this.history,
      clear: this.clear,
    };

    this.commandHistory = [];

    this.active = false;
  }


  /*  service methods  */
  start() {
    this.resume();
    this.view.printString('Hello!');
    this.view.addInput(this.intro);
  }

  stop() {
    this.pause();
    this.commandHistory = [];
  }

  pause() {
    this.active = false;
    this.view.hide();
    Object.keys(this.listeners).forEach((key) => {
      this.view.removeEventListener(key, this.listeners[key].bind(this));
    });
  }

  resume() {
    this.active = true;
    this.view.show();
    Object.keys(this.listeners).forEach((key) => {
      this.view.addEventListener(key, this.listeners[key].bind(this));
    });
  }


  /*   handlers   */
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
      this.view.printString(` * ${command}`);
    });
  }

  clear() {
    this.view.clear();
  }
}


export default TerminalApp;
