import AjaxModule from '../../modules/ajax';
import { validateEdit, isValid } from '../validation/validation';

const editProfileTemplate = require('./editprofile.pug');

const root = document.getElementById('root');

const callbackEditProgile = (xhr) => {
  const user = JSON.parse(xhr.responseText);
  root.innerHTML = editProfileTemplate({
    user,
  });
  validateEdit();

  const editProfileForm = root.getElementById('#editProfileForm');
  editProfileForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (isValid()) {
      const formData = new FormData(editProfileForm);

      AjaxModule.Put({
        callback() {
          const ev = new CustomEvent('link', { detail: 'profile' });
          root.dispatchEvent(ev);
        },
        path: '/user',
        body: formData,
      });
    }
  });
};

export default function createEditProfile() {
  AjaxModule.Get({
    callback: callbackEditProgile,
    path: '/me',
  });
}
