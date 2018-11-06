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
    console.log('ama here');
    super.show();
    this.render();
  }

  async render() {
    if (!userService.isLoggedIn()) {
      const user = { authorized: false };
      document.getElementById('username').innerHTML = '';
      super.render({ user });
      return;
    }

    const user = userService.getUser();
    console.log('User received!');
    console.log(user);


    // user.authorized = true;
    // user.avatarSource = profile.avatarSource;
    // user.name = profile.username;
    // // TODO: FIXME: remove id
    // document.getElementById('username').innerHTML = user.name;
    // super.render({ user });
    // // TODO: FIXME: remove id
    // const profileButton = document.getElementById('userblockAvatar');
    // profileButton.addEventListener('click', () => bus.emit('link', '/profile'));



    // console.error(err);
  }
}
