import Element from '../../../element';

import './bar.pcss';

import template from './bar.pug';

import userService from '../../../../modules/userservice';

export default class Bar extends Element {
  constructor(parent, wrapper) {
    super(template, parent, wrapper || parent);
    super.render();
    this.hidden = true;
  }

  show() {
    const { err, loggedIn } = userService.isLoggedIn();
    if (err || !loggedIn) return false;
    if (!this.hidden) return false;
    const [bar] = this.wrapper.getElementsByClassName('bar');
    this.hidden = false;
    this.hideTimeout = setTimeout(() => this.hide(), 5000);
    return bar.animate({
      transform: [
        'translateY(-100px)',
        'translateY(0px)',
      ],
    }, {
      duration: 300,
      fill: 'forwards',
      easing: 'cubic-bezier(.36,1.08,.55,.93)',
    });
  }

  hide() {
    clearTimeout(this.hideTimeout);
    if (this.hidden) return false;
    const [bar] = this.wrapper.getElementsByClassName('bar');
    this.hidden = true;
    return bar.animate({
      transform: [
        'translateY(0px)',
        'translateY(-65px)',
      ],
    }, {
      duration: 100,
      fill: 'forwards',
      easing: 'cubic-bezier(.36,1.08,.55,.93)',
    });
  }
}
