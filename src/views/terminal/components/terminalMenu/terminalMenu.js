import Menu from '../../utils/menu/menu';
import LoginForm from '../forms/loginForm/loginForm';
import SignupForm from '../forms/signupForm/signupForm';

export default class TerminalMenu {
  constructor(root, busController) {
    this.root = root;
    this.busController = busController;

    this.root.indexHTML = '';

    this.fieldsEvents = {
      login: 'terminalMenuLogin',
      signup: 'trminalMenuSignup',
      logout: 'terminalMenuLogout',
    };

    this.eventsMethods = {
      terminalMenuLogin: this.login.bind(this),
      trminalMenuSignup: this.signup.bind(this),
      terminalMenuLogout: this.logout.bind(this),
    };

    this.busController.setBusListeners(this.eventsMethods);

    this.eventsInputMethods = {
      loginSuccess: this.loginSuccess.bind(this),
      signupSuccess: this.signupSuccess.bind(this),
      logoutSuccess: this.logoutSuccess.bind(this),
    };

    this.busController.setBusListeners(this.eventsInputMethods);

    this.menu = new Menu(this.root, this.fieldsEvents, this.busController);
  }

  login() {
    const _ = new LoginForm(this.root, this.busController);
  }

  loginSuccess(username, password) {
    console.log('login suc', username);
    this.removeListeners();
    this.busController.emit('terminalMenuClose', username);
  }

  signup() {
    const _ = new SignupForm(this.root, this.busController);
  }

  signupSuccess(username, password) {
    console.log('termMenu catch', username);
    this.removeListeners();
    this.busController.emit('terminalMenuClose', username);
  }

  logout() {
    this.logoutSuccess();
  }

  logoutSuccess() {
    this.removeListeners();
    this.busController.emit('terminalMenuClose');
  }

  removeListeners() {
    this.busController.removeBusListeners(this.eventsMethods);
    this.busController.removeBusListeners(this.eventsInputMethods);
  }
}
