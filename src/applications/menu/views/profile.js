import { logout } from '../../../modules/network';
import userService from '../../../modules/userservice';
import bus from '../../../modules/bus';
import Element from '../../element';
import '../styles/profile.pcss';

const template = require('../templates/profile.pug');


export default class ProfileView extends Element {
  constructor(parent) {
    super(template, parent);
  }

  show() {
    super.show();
    this.render();
  }

  async render() {
    bus.ignore('userUpdated', this.render.bind(this));
    const { err: error, user } = userService.getUser();

    if (error) {
      if (error === 'updating') {
        bus.listen('userUpdated', this.render.bind(this));
        // TODO: FIXME: draw skeleton or loader here
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
      bus.emit('checkUser', 'logout');
    });
  }
}
