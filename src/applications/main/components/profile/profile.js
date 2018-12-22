import Element from '../../../element';
import { updateProfile } from '../../../../modules/network';

import './profile.pcss';

import '../../../../../static/img/triss.jpg';

import template from './profile.pug';


export default class Profile extends Element {
  constructor(parent, wrapper) {
    super(template, parent, wrapper || parent);

    this.photoUpload = this.photoUpload.bind(this);
  }

  update() {
    this.render();
  }

  photoUpload() {
    [this.avatarUpload] = document.getElementsByClassName('profile-avatar-upload');
    this.avatarUpload.click();
  }

  show() {
    [this.avatarWrapper] = document.getElementsByClassName('profile__avatar-wrapper');
    this.avatarWrapper.addEventListener('click', this.photoUpload);
    super.show();
    [this.avatarUpload] = document.getElementsByClassName('profile-avatar-upload');
    this.avatarUpload.addEventListener('change', this.updateAvatar);
  }

  async updateAvatar() {
    let form = document.getElementById('uploadForm');
    const registerData = new FormData(form);
    console.log(registerData);
    const { err } = await updateProfile(registerData);
    if (err) {
      console.error(err);
    }
    console.log('sendAvatar');
    this.render();
  }

  render() {
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
