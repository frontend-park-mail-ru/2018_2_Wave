import userService from '../../../modules/userservice';
import bus from '../../../modules/bus';
import BaseView from '../../base_view';

import '../styles/userblock.css';

const template = require('../templates/userblock.pug');


export default class UserblockView extends BaseView {
  constructor(parent) {
    super(template, parent);
    this.isPage = false;
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

    const [profileButton] = document.getElementsByClassName('userblock__avatar');
    profileButton.addEventListener('click', () => bus.emit('link', '/profile'));
  }
}
