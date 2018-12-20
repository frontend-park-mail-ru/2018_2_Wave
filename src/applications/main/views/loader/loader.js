import Element from '../../../element';

import template from './loader.pug';
import './loader.pcss';

import userService from '../../../../modules/userservice';
import bus from '../../../../modules/bus';

export default class Loader extends Element {
  constructor(parent, wrapper) {
    super(template, parent, wrapper);
    this.checkUser = this.checkUser.bind(this);
  }

  show() {
    super.show();
    this.checkUser();
  }

  checkUser() {
    const { err, loggedIn } = userService.isLoggedIn();
    if (err) bus.listen('userUpdated', this.checkUser);
    else if (loggedIn) {
      this.hide();
      console.log('logged in');
    } else {
      const mockBlock = document.createElement('a');
      mockBlock.classList.add('mock-block');
      mockBlock.setAttribute('href', '/terminal');
      this.wrapper.appendChild(mockBlock);
      mockBlock.click();
      setTimeout(this.hide, 500);
    }
  }
}
