import UsernameValidation from '../validations/usernameValidation';
import PasswordValidation from '../validations/passwordValidation';
import Form from '../../../utils/form/form';

export default class LoginForm {
  constructor(root, busController) {
    this.formData = {
      fields: [
        {
          fieldName: 'username',
          validationClass: UsernameValidation,
        },
        {
          fieldName: 'password',
          validationClass: PasswordValidation,
          isSecret: true,
        },
      ],
      formEvent: 'loginFormEvent',
    };
    this.busController = busController;
    this.root = root;

    this.root.innerHTML = '';

    this.eventMethods = {
      [this.formData.formEvent]: this.login.bind(this),
    };
    this.busController.setBusListeners(this.eventMethods);
    this.start();
  }

  start() {
    this.loginForm = new Form(this.formData, this.root, this.busController);
  }

  login(username, password) {
    // TODO login user by fetch
    console.log('loginfiorm', username, password);
    const fetchResult = true;
    if (fetchResult) {
      this.success(username);
    } else {
      this.root.innerHTML += '<div>Wrong username or password. Try again</div>';
      this.start();
    }
  }

  success(username) {
    this.busController.removeBusListeners(this.eventMethods);
    this.busController.emit('loginSuccess', username);
  }
}
