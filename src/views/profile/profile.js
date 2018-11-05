import ajax from '../../modules/ajax';
import bus from '../../modules/bus';
import BaseView from '../baseview';
import './profile.css';

const template = require('./profile.pug');


export default class ProfileView extends BaseView {
  constructor(parent) {
    super(template, parent);
  }

  show() {
    super.show();
    this.render();
  }

  async render() {
    try {
      const user = await ajax.GET({ path: '/users/me' });
      super.render({ user });
      const logout = document.getElementById('logoutbutton');
      logout.addEventListener('click', async () => {
        await ajax.DELETE({ path: '/session' });
        // TODO: to userService
        bus.emit('userUpdate');
      });
    } catch (error) {
      console.error(error);
    }
  }
}
