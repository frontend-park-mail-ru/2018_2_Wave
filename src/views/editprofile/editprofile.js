import { getProfile, updateProfile } from '../../modules/network';
import bus from '../../modules/bus';
import BaseView from '../baseview';
import { validateEdit } from '../validation/validation';

const template = require('./editprofile.pug');


export default class ProfileEditView extends BaseView {
  constructor(parent) {
    super(template, parent);
  }

  show() {
    super.show();
    if (!this.rendered) {
      // TODO: FIXME: get name from UserService and rerender
      this.render();
    }
  }

  async render() {
    const { err, profile } = await getProfile();

    if (err) {
      console.error(err);
      return;
    }
    // TODO: get from UserService
    super.render({ user: profile });

    const editForm = document.getElementById('editProfileForm');
    editForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const { error } = await updateProfile();

      if (error) {
        console.error(error);
        // TODO: show interface error
      }

      bus.emit('link', '/profile');
      bus.emit('userUpdate');

      validateEdit();
    });
  }
}
