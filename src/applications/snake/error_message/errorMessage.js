import Element from '../../element';
import ErrorMessageTemplate from './errorMessage.pug';
import './errorMessage.pcss';

let instance;
export default class ErrorMessage extends Element {
  constructor() {
    if (!instance) {
      const [parent] = document.getElementsByClassName('game-container');
      super(ErrorMessageTemplate, parent, false, ['error-message-wrapper']);
      super.show();
      [this.message] = parent.getElementsByClassName('error-message-text');
      instance = this;
    }
    return instance;
  }

  setErrorMessage(errorMessage) {
    clearTimeout(this.timerId);
    this.message.innerHTML = errorMessage;
    this.timerId = setTimeout(this.clearErrorMessage.bind(this), 10000);
  }

  clearErrorMessage() {
    this.message.innerHTML = '';
  }
}
