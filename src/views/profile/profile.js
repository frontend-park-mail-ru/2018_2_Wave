import { logout } from '../../modules/network';
import userService from '../../modules/userservice';
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
    console.log('came in profile');

    bus.ignore('userUpdated', this.render.bind(this));
    const { err: error, user } = userService.getUser();

    console.log('in profile', error, user);


    if (error) {
      if (error === 'updating') {
        console.log('Waiting until userservice updates...');
        bus.listen('userUpdated', this.render.bind(this));
      } else if (error !== 'unauthorized') {
        console.error(error);
      }
      return;
    }

    super.render({ user });

    const logoutButton = document.getElementById('logoutbutton');
    logoutButton.addEventListener('click', async () => {
      const { err } = await logout();
      if (err) console.error(err);
      bus.emit('checkUser');
    });
  }
}
