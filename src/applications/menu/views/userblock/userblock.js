import userService from '../../modules/userservice';
import bus from '../../modules/bus';
import BaseView from '../baseview';
import './userblock.css';

const template = require('./userblock.pug');


export default class UserblockView extends BaseView {
  constructor(parent) {
    super(template, parent);
    bus.listen('userUpdated', this.update.bind(this));
  }

  update() {
    super.show();
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
