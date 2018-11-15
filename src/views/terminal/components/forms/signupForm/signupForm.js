import UsernameValidation from '../validations/usernameValidation';
import PasswordValidation from '../validations/passwordValidation';
import Form from '../../../utils/form/form';

export default class SignupForm {
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
      formEvent: 'signupFormEvent',
    };
    this.busController = busController;
    this.root = root;

    this.root.innerHTML = '';

    this.eventsMethods = {
      [this.formData.formEvent]: this.signup.bind(this),
    };
    console.log(this.eventsMethods);
    this.busController.setBusListeners(this.eventsMethods);
    this.start();
  }

  start() {
    this.signupForm = new Form(this.formData, this.root, this.busController);
  }

  signup(username, password) {
    // TODO signup user by fetch
    console.log('signupform', username, password);
    const fetchResult = true;
    if (fetchResult) {
      this.success(username);
    } else {
      this.root.innerHTML += '<div>Username is already exist. Try again</div>';
      this.start();
    }
  }

  success(username) {
    this.root.innerHTML += `<div>Welcome, ${username}</div>`;
    this.busController.removeBusListeners(this.eventsMethods);
    this.busController.emit('signupSuccess', username);
  }
}
