import ajax from '../../modules/ajax';
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
    try {
      // TODO: get it from UserService
      const data = await ajax.GET({ path: '/user' });
      user.authorized = true;
      user.avatarSource = data.avatarSource;
      user.name = data.username;
      // TODO: FIXME: remove id
      document.getElementById('username').innerHTML = user.name;
      super.render({ user });
      // TODO: FIXME: remove id
      const profileButton = document.getElementById('userblockAvatar');
      profileButton.addEventListener('click', () => bus.emit('link', '/profile'));
    } catch (error) {
      console.error(error);
      user.authorized = false;
      document.getElementById('username').innerHTML = '';
      super.render({ user });
    }
  }
}
