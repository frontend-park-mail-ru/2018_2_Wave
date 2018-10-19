import ajax from '../../modules/ajax';
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
      const user = await ajax.GET({ path: '/user' });
      super.render({ user });
      const logout = document.getElementById('logoutbutton');
      logout.addEventListener('click', () => {
        // TODO: to userService
        ajax.POST({ path: '/user/logout' });
      });
    } catch (error) {
      console.error(error);
    }
  }
}
