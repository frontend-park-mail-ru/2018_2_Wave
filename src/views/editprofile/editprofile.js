import { updateProfile } from '../../modules/network';
import userService from '../../modules/userservice';
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
    bus.ignore('userUpdated', this.render.bind(this));
    const { err, user } = userService.getUser();

    if (err) {
      if (err === 'updating') {
        bus.listen('userUpdated', this.render.bind(this));
        // TODO: FIXME: draw skeleton or loader here
      } else if (err !== 'unauthorized') {
        console.error(err);
      }
      return;
    }


    super.render({ user });

    const editForm = document.getElementById('editProfileForm');
    editForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const { error } = await updateProfile();

      if (error) {
        console.error(error);
        // TODO: show interface error
      }

      bus.emit('link', '/profile');
      bus.emit('checkUser');

      validateEdit();
    });
  }
}
