import { getProfile } from '../../modules/network';
import bus from '../../modules/bus';
import BaseView from '../baseview';
import './userblock.css';

const template = require('./userblock.pug');


export default class UserblockView extends BaseView {
  constructor(parent) {
    super(template, parent);
    bus.listen('userUpdate', this.update.bind(this));
  }

  update() {
    super.show();
    this.render();
  }

  async render() {
    const user = {};
    // TODO: get it from UserService
    const { err, profile } = await getProfile();
    if (!err) {
      user.authorized = true;
      user.avatarSource = profile.avatarSource;
      user.name = profile.username;
      // TODO: FIXME: remove id
      document.getElementById('username').innerHTML = user.name;
      super.render({ user });
      // TODO: FIXME: remove id
      const profileButton = document.getElementById('userblockAvatar');
      profileButton.addEventListener('click', () => bus.emit('link', '/profile'));
    } else {
      user.authorized = false;
      document.getElementById('username').innerHTML = '';
      super.render({ user });

      console.error(err);
    }
  }
}
