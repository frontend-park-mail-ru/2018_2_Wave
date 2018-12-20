import TerminalView from './terminal_view';
import BaseApp from '../base_app';
import messages from './messages';
import bus from '../../modules/bus';
import { register } from '../../modules/network';

class TerminalApp extends BaseApp {
  constructor(url, parent) {
    super(url, parent, TerminalView);

    this.intro = 'stanford@wave:~/$';

    this.listeners = {
      keydown: this.handleKeypress.bind(this),
      click: this.focusInput.bind(this),
    };

    this.commands = {
      register: this.register,
      help: this.help,
      history: this.history,
      clear: this.clear,
      snake: () => bus.emit('link', '/snake'),
      exit: () => bus.emit('link', '/'),
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
    this.parent.style.background = 'black';
    super.start();
    this.addListeners();
    this.view.printBlock(messages.hello);
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
    this.parent.style.background = 'black';
    super.resume();
    this.view.focusInput();
    this.addListeners();
    this.focusInput();
  }


  /*   terminal commands   */
  register() {
    let name, password, password2;
    const processData = async (value) => {
      password2 = value;
      if (password === password2) {
        console.log('valid');
        const formdata = new FormData();
        formdata.append('username', name);
        formdata.append('password', password);
        const { err } = await register(formdata);
        if (!err) {
          this.view.printString(`Hello, ${name}!`);
          this.view.addInput(this.intro);
        }
      } else {
        this.view.printString('Passwords don\'t match.');
        this.view.addInput(this.intro);
      }
    };
    const repeatPassword = (value) => {
      password = value;
      this.ask('  repeat password:', processData, true);
    };
    const askPassword = (value) => {
      name = value;
      this.ask('  password:', repeatPassword, true);
    };
    this.ask('  your name:', askPassword);
  }

  help() {
    this.view.printString('Available commands:');
    Object.keys(this.commands).forEach((key) => {
      this.view.printString(` * ${key}`);
    });
    this.view.addInput(this.intro);
  }

  history() {
    this.commandHistory.forEach((command) => {
      this.view.printString(` * ${command}`);
    });
    this.view.addInput(this.intro);
  }

  clear() {
    this.view.clear();
    this.view.addInput(this.intro);
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
  }

  ask(message, process, hideInput) {
    const callback = (ev) => {
      if (ev.which === 13) {
        ev.preventDefault();
        process(this.view.processInput());
        this.terminal.removeEventListener('keydown', callback);
        this.terminal.addEventListener('keydown', this.listeners.keydown);
      }
    };

    if (hideInput) this.view.addPasswordInput(message);
    else this.view.addInput(message);
    this.terminal.removeEventListener('keydown', this.listeners.keydown);
    this.terminal.addEventListener('keydown', callback);
  }

  focusInput() {
    const input = this.view.getInput();
    if (input) {
      input.focus();
    }
  }

  addListeners() {
    Object.keys(this.listeners).forEach((key) => {
      // FIXME:
      this.terminal.addEventListener(key, this.listeners[key]);
    });
  }

  removeListeners() {
    Object.keys(this.listeners).forEach((key) => {
      // FIXME:
      this.terminal.removeEventListener(key, this.listeners[key]);
    });
  }
}


export default TerminalApp;
