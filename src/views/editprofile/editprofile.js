import ajax from '../../modules/ajax';
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
    try {
      const user = await ajax.GET({ path: '/users/me' });
      // TODO: get user from UserService
      super.render({ user });

      const editForm = document.getElementById('editProfileForm');
      editForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        try {
          await ajax.PUT({
            path: '/users/me',
            body: new FormData(editForm),
          });
          bus.emit('link', '/profile');
          bus.emit('userUpdate');
        } catch (error) {
          console.error(error);
          // TODO: show interface error
        }
        validateEdit();
      });
    } catch (error) {
      console.error(error);
    }
  }
}
