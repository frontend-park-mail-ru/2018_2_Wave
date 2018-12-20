import TerminalView from './terminal_view';
import BaseApp from '../base_app';
import messages from './messages';
import bus from '../../modules/bus';
import { register, logout } from '../../modules/network';
import userService from '../../modules/userservice';

class TerminalApp extends BaseApp {
  constructor(url, parent) {
    super(url, parent, TerminalView);

    this.username = 'guest';

    this.listeners = {
      keydown: this.handleKeypress.bind(this),
      click: this.focusInput.bind(this),
    };

    this.commands = {
      // me: this.me,
      logout: this.logout,
      register: this.register,
      help: this.help,
      history: this.history,
      clear: this.clear,
      snake: () => {
        bus.emit('link', '/snake');
        this.view.addInput(this.intro);
      },
      exit: async () => {
        const { err, loggedIn } = await userService.isLoggedIn();
        if (err || !loggedIn) {
          const frases = [
            ' Not now, dear.',
            ' Why are you so serious?',
            ' I have headache.',
            ' Don\'t leave me alone...',
            ' Nope :3',
            ' You don\'t like me?',
          ];
          this.view.printString(frases[Math.floor(Math.random() * frases.length)]);
          this.view.addInput(this.intro);
        } else {
          bus.emit('link', '/');
          this.view.addInput(this.intro);
        }
      },
    };

    this.commandHistory = [];
  }

  get intro() {
    return `${this.username}@wave:~/&`;
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
    this.terminal.removeEventListener('keydown', this.listeners.keydown);
    let name, password, password2;
    const processData = async (value) => {
      password2 = value;
      if (password === password2) {
        const formdata = new FormData();
        formdata.append('username', name);
        formdata.append('password', password);
        const { err } = await register(formdata);
        if (!err) {
          this.view.printString(`Hello, ${name}!`);
          this.username = name;
          this.view.addInput(this.intro);
        }
      } else {
        this.view.printString('Passwords don\'t match.');
        this.view.addInput(this.intro);
      }
      this.terminal.addEventListener('keydown', this.listeners.keydown);
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

  async logout() {
    const { err } = await logout();
    console.log(err);
    if (!err) {
      this.view.printString('Ok');
      this.view.addInput(this.intro);
    } else if (err.status === 401) {
      this.view.printString('Already.');
      this.view.addInput(this.intro);
    }
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
        this.view.addInput(this.intro);
      }
      this.commandHistory.push(command);
    } else {
      this.view.addInput(this.intro);
    }
  }

  ask(message, process, hideInput) {
    const callback = async (ev) => {
      if (ev.which === 13) {
        ev.preventDefault();
        await process(this.view.processInput());
        this.terminal.removeEventListener('keydown', callback);
      }
    };

    if (hideInput) this.view.addPasswordInput(message);
    else this.view.addInput(message);
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
