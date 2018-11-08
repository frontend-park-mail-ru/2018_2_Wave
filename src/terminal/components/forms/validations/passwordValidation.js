import Validation from '../../../utils/validation/validation';

export default class PasswordValidation {
  constructor(password) {
    this.passwordValidityChecks = [
      {
        isValid(value) {
          return value.match(/^\S{6,}$/);
        },
        invalidityMessage: 'This input needs to be at least 6 characters',
      },
    ];
    this.validation = new Validation(password, this.passwordValidityChecks);
  }

  isValid() {
    return this.validation.isValid();
  }

  getInvalidityMessages() {
    return this.validation.getInvalidityMessages();
  }
}
