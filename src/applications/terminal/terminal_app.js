import TerminalView from './terminal_view';
import BaseApp from '../base_app';
import messages from './messages';
import bus from '../../modules/bus';
import localeManager from '../../modules/locale';
import { register, logout, login } from '../../modules/network';
import userService from '../../modules/userservice';

class TerminalApp extends BaseApp {
  constructor(url, parent) {
    super(url, parent, TerminalView);

    this.username = null;

    this.listeners = {
      keydown: this.handleKeypress.bind(this),
      click: this.focusInput.bind(this),
      keyup: this.handleKeyup.bind(this),
    };

    this.commands = {
      // me: this.me,
      register: this.register,
      login: this.login,
      snake: () => {
        bus.emit('link', '/snake');
        this.view.addInput(this.intro);
      },
      history: this.history,
      clear: this.clear,
      logout: this.logout,
      help: this.help,
      exit: async () => {
        const { err, loggedIn } = await userService.isLoggedIn();
        console.log(err, loggedIn);

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

    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.setUsername();
    this.commandHistory = [];
    this.currentCommandIndex = -1;
    bus.listen('userUpdated', this.setUsername);
  }

  setUsername() {
    bus.ignore('userUpdated', this.setUsername);
    const { err, loggedIn } = userService.isLoggedIn();
    if (err) bus.listen('userUpdated', this.setUsername);
    else if (!loggedIn) {
      this.username = 'guest';
    } else {
      const { user } = userService.getUser();
      this.username = user.username;
    }
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
    this.setUsername();
    this.parent.style.background = 'black';
    super.start();
    this.addListeners();
    const { locale } = localeManager;
    this.view.printBlock(locale === 'DE' ? messages.helloDe : messages.hello);

    if (this.username !== null) {
      this.view.addInput(this.intro);
    } else {
      const callback = () => {
        bus.ignore('userUpdated', callback);
        setTimeout(() => this.view.addInput(this.intro), 100);
      };
      bus.listen('userUpdated', callback);
    }
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
    bus.ignore('userUpdated', this.register);
    const { err, loggedIn } = userService.isLoggedIn();
    if (err) bus.listen('userUpdated', this.register);
    else if (loggedIn) {
      this.view.printString(`I already know you, ${this.username}.`);
      this.view.addInput(this.intro);
      return;
    }

    this.terminal.removeEventListener('keydown', this.listeners.keydown);
    let name, password, password2;
    const processData = async (value) => {
      password2 = value;
      if (password === password2) {
        const formdata = new FormData();
        formdata.append('username', name);
        formdata.append('password', password);
        const { err: regErr } = await register(formdata);
        if (!regErr) {
          this.view.printString(`Hello, ${name}!`);
          bus.emit('checkUser');
          bus.emit('appInstalled');
          this.username = name;
          this.view.addInput(this.intro);
        } else {
          this.view.printString('This name already in use!');
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
      if (password.length < 3) {
        this.view.printString('Even my mom hacks this short password.');
        this.ask('  password:', repeatPassword, true);
      } else if (!password.match(/[\S]{4,}/)) {
        this.view.printString('Maybe better without gaps.');
        this.ask('  password:', repeatPassword);
      } else {
        this.ask('  repeat password:', processData, true);
      }
    };

    const askPassword = (value) => {
      name = value;
      if (name.length < 3) {
        this.view.printString('I hope you have something longer in stock.');
        this.ask('  your name:', askPassword);
      } else if (!name.match(/[\S]{4,}/)) {
        this.view.printString('Maybe better without gaps.');
        this.ask('  your name:', askPassword);
      } else {
        this.ask('  password:', repeatPassword, true);
      }
    };

    this.ask('  your name:', askPassword);
  }

  login() {
    bus.ignore('userUpdated', this.login);
    const { err, loggedIn } = userService.isLoggedIn();
    if (err) bus.listen('userUpdated', this.login);
    else if (loggedIn) {
      this.view.printString(`I already know you, ${this.username}.`);
      this.view.addInput(this.intro);
      return;
    }

    this.terminal.removeEventListener('keydown', this.listeners.keydown);
    let name, password;
    const processData = async (value) => {
      password = value;
      if (password.length < 3) {
        this.view.printString(`Looks like you remember only ${password.length} characters.`);
        this.ask('  password:', processData, true);
      } else if (!password.match(/[\S]{3,}/)) {
        this.view.printString('Maybe better without gaps.');
        this.ask('  password:', processData, true);
      } else if (password) {
        const formdata = new FormData();
        formdata.append('username', name);
        formdata.append('password', password);
        const { err: regErr } = await login(formdata);
        if (!regErr) {
          this.view.printString(`Hello, ${name}!`);
          bus.emit('checkUser');
          this.username = name;
          this.view.addInput(this.intro);
        } else {
          this.view.printString('Wrong name or password.');
          this.view.addInput(this.intro);
        }
        this.terminal.addEventListener('keydown', this.listeners.keydown);
      }
    };

    const askPassword = (value) => {
      name = value;
      if (name.length < 3) {
        this.view.printString(`Your name seems to be longer than ${name.length} characters.`);
        this.ask('  your name:', askPassword);
      } else if (!name.match(/[\S]{3,}/)) {
        this.view.printString('Maybe better without gaps.');
        this.ask('  your name:', askPassword);
      } else {
        this.ask('  password:', processData, true);
      }
    };
    this.ask('  your name:', askPassword);
  }

  async logout() {
    const { err } = await logout();
    console.log(err);
    if (!err) {
      this.view.printString('Ok');
      bus.emit('checkUser', 'logout');
      this.username = 'guest';
      this.view.addInput(this.intro);
    } else if (err.status === 401) {
      this.view.printString('Already.');
      this.view.addInput(this.intro);
    } else {
      this.view.printString('Internal error, try later.');
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

  break() {
    this.view.processInput();
    this.view.printString('Break!');
    this.view.addInput(this.intro);
  }


  /*   handlers and listeners   */
  handleKeypress(ev) {
    switch (ev.keyCode) {
      case 13:  // enter
        ev.preventDefault();
        this.handleCommand();
        break;
      case 38:
        ev.preventDefault();
        this.toggleUp();
        break;
      case 40:
        ev.preventDefault();
        this.toggleDown();
        break;
      case 67:
        if (this.ctrlDown) {
          ev.preventDefault();
          this.break();
        }
        break;
      case 76:
        if (this.ctrlDown) {
          ev.preventDefault();
          this.clear();
        }
        break;
      case 91:
      case 17:
        this.ctrlDown = true;
        break;
      default:
        break;
    }
  }

  handleKeyup(ev) {
    switch (ev.keyCode) {
      case 91:
      case 17:
        this.ctrlDown = false;
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
      this.commandHistory.unshift(command);
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

  toggleCommandHistory(direction) {
    let newIndex = this.currentCommandIndex + direction;

    if (newIndex < -1) newIndex = -1;
    if (newIndex >= this.commandHistory.length) newIndex = this.commandHistory.length - 1;

    if (newIndex !== this.currentCommandIndex) {
      this.currentCommandIndex = newIndex;
    }

    if (newIndex > -1) {
      this.view.setInput(this.commandHistory[newIndex]);
    } else {
      this.view.setInput('');
    }
  }

  toggleUp() {
    this.toggleCommandHistory(1);
  }

  toggleDown() {
    this.toggleCommandHistory(-1);
  }
}


export default TerminalApp;
