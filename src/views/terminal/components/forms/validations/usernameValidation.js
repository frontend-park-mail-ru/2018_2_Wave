import Validation from '../../../utils/validation/validation';

export default class UsernameValidation {
  constructor(username) {
    this.usernameValidityChecks = [
      {
        isValid(value) {
          return value.match(/^\S{4,}$/);
        },
        invalidityMessage: 'Username needs to be at least 4 characters',
      },
    ];
    this.validation = new Validation(username, this.usernameValidityChecks);
  }

  isValid() {
    return this.validation.isValid();
  }

  getInvalidityMessages() {
    return this.validation.getInvalidityMessages();
  }
}
