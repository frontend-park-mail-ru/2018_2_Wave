import AjaxModule from '../../modules/ajax';
import {
  validateEdit,
} from '../validation/validation';

const editProfileTemplate = require('./editprofile.pug');

const root = document.getElementById('root');

const callbackEditProgile = (response) => {
  response.json().then((user) => {
    root.innerHTML = editProfileTemplate({
      user,
    });

    const editProfileForm = root.querySelector('#editProfileForm');
    editProfileForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(editProfileForm);
      AjaxModule.Post({
        callback() {
          const ev = new CustomEvent('link', {
            detail: 'profile',
          });
          root.dispatchEvent(ev);
        },
        path: '/user/edit',
        body: formData,
      });
    });
    validateEdit();
  });
};

export default function createEditProfile() {
  AjaxModule.Get({
    callback: callbackEditProgile,
    path: '/user',
  });
}