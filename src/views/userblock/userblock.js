import userService from '../../modules/userservice';
import bus from '../../modules/bus';
import BaseView from '../baseview';
import './userblock.css';

const template = require('./userblock.pug');


export default class UserblockView extends BaseView {
  constructor(parent) {
    super(template, parent);
    // bus.listen('userUpdated', this.update.bind(this));
  }

  update() {
    super.show();
    this.render();
  }

  async render() {
    const { loggedIn } = userService.isLoggedIn();

    if (!loggedIn) {
      document.getElementById('username').innerHTML = '';
      super.render({ authorized: false });
      return;
    }


    const { user } = userService.getUser();

    const authorized = true;
    // TODO: FIXME: remove id
    document.getElementById('username').innerHTML = user.username;

    super.render({ user, authorized });
    // TODO: FIXME: remove id
    const profileButton = document.getElementById('userblockAvatar');
    profileButton.addEventListener('click', () => bus.emit('link', '/profile'));
  }
}
