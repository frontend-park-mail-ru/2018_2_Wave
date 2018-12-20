import Element from '../../../element';

import template from './loader.pug';
import './loader.pcss';

import userService from '../../../../modules/userservice';
import bus from '../../../../modules/bus';

export default class Loader extends Element {
  constructor(parent, wrapper) {
    super(template, parent, wrapper);
    this.checkUser = this.checkUser.bind(this);
    this.hide = super.hide.bind(this);
    this.show = this.show.bind(this);

    bus.listen('userUpdated', () => {
      const { loggedIn } = userService.isLoggedIn();
      if (loggedIn) this.hide();
      else this.show();
    });
  }

  show() {
    super.show();
    this.checkUser();
  }

  checkUser() {
    bus.ignore('userUpdated', this.checkUser);
    const { err, loggedIn } = userService.isLoggedIn();
    if (err) bus.listen('userUpdated', this.checkUser);
    else if (loggedIn) {
      this.hide();
      console.log('logged in');
      setTimeout(this.hide, 500);
    } else {
      const mockBlock = document.createElement('a');
      mockBlock.classList.add('mock-block');
      mockBlock.setAttribute('href', '/terminal');
      this.wrapper.appendChild(mockBlock);
      mockBlock.click();
      mockBlock.hidden = true;
    }
  }
}
