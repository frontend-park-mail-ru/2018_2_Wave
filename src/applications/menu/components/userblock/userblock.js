import userService from '../../../../modules/userservice';
import bus from '../../../../modules/bus';
import Element from '../../../element';

import './userblock.pcss';

import '../../../../../static/img/triss.jpg';


const template = require('./userblock.pug');


export default class UserBlock extends Element {
  constructor(parent, wrapper) {
    super(template, parent, wrapper || parent);

    bus.listen('userUpdated', this.update.bind(this));
  }

  update() {
    this.render();
  }

  async render() {
    const { loggedIn } = userService.isLoggedIn();

    if (!loggedIn) {
      const user = { username: '' };
      super.render({ user, authorized: false });
      return;
    }


    const authorized = true;
    const { user } = userService.getUser();
    super.render({ user, authorized });

    const [profileButton] = this.wrapper.getElementsByClassName('userblock__avatar');
    profileButton.addEventListener('click', () => bus.emit('link', '/profile'));
  }
}
