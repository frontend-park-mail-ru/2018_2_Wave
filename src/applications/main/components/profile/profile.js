import userService from '../../../../modules/userservice';
import bus from '../../../../modules/bus';
import Element from '../../../element';

import './profile.pcss';

import '../../../../../static/img/triss.jpg';

import template from './profile.pug';


export default class Profile extends Element {
  constructor(parent, wrapper) {
    super(template, parent, wrapper || parent);

    // bus.listen('userUpdated', this.update.bind(this));

    this.avatarWrapper = parent.getElementsByClassName('profile__avatar-wrapper');
    // this.avatarWrapper.addEventListener('click', async (ev) => {
    //   console.log(ev.target);
    //   if (ev.target.classList.contains('add-button')) {
    //     const { err } = await addApp(this.shownApp.name);
    //     if (err) console.error(err);
    //   }
    // });
  }

  update() {
    this.render();
  }

  rende() {
    super.render();
  }
//   async render() {
//     const { loggedIn } = userService.isLoggedIn();

//     if (!loggedIn) {
//       const user = { username: '' };
//       super.render({ user, authorized: false });
//       return;
//     }


//     const authorized = true;
//     const { user } = userService.getUser();
//     super.render({ user, authorized });

//     const [profileButton] = this.wrapper.getElementsByClassName('userblock__avatar');
//     profileButton.addEventListener('click', () => bus.emit('link', '/profile'));
//   }
}
