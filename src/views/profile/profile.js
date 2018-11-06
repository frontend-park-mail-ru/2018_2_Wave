import { logout, getProfile } from "../../modules/network";
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
    const { err: error, profile: user } = await getProfile();
    if (error) {
      console.error(error);
      return;
    }
    super.render({ user });

    const logoutButton = document.getElementById('logoutbutton');
    logoutButton.addEventListener('click', async () => {
      const { err } = await logout();
      if (err) console.error(err);
      bus.emit('userUpdate');
    });
  }
}
