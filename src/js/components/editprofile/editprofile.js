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
      console.log('submit');
      const formData = new FormData(editProfileForm);
      for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }
      AjaxModule.Put({
        callback() {
          const ev = new CustomEvent('link', {
            detail: 'profile',
          });
          root.dispatchEvent(ev);
        },
        path: '/user',
        body: formData,
      });
    });
  });
  validateEdit();
};

export default function createEditProfile() {
  AjaxModule.Get({
    callback: callbackEditProgile,
    path: '/me',
  });
}