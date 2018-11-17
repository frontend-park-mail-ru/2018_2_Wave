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
    };

    this.commandHistory = [];
  }


  handle(ev) {
    switch (ev.keyCode) {
      case 13:  // enter
        ev.preventDefault();
        this.enterPressed();
        break;
      default:
        break;
    }
  }


  // enterPressed() {

  // }


  /*  terminal commands  */
  help() {
    Object.keys(this.commands).forEach((key) => {
      this.view.printString(key);
    });
  }

  history() {
    this.commandHistory.forEach((command) => {
      this.view.printString(command);
    });
  }


  /*  service methods  */
  start() {
    this.view.show();
    this.view.printString('stanford@rasseki:~/$ hello terminal');
    const intro = 'stanford@rasseki:~/$';
    this.view.addInput(intro);
    Object.keys(this.listeners).forEach((key) => {
      document.addEventListener(key, this.listeners[key]);
    });
  }

  stop() {
    Object.keys(this.listeners).forEach((key) => {
      document.removeEventListener(key, this.listeners[key]);
    });
  }
}


export default TerminalApp;
