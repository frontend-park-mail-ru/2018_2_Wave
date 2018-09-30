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
  // const editProfileForm = root.getElementById('editProfileForm');
  const editProfileForm = root.querySelector('#editProfileForm');

  editProfileForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (isValid()) {
      // const formData = new FormData(editProfileForm);
      const username = root.querySelector('#usernameInput').value;
      const password = root.querySelector('#passwordInput').value;
      console.log(username, password);

      AjaxModule.doPut({
        callback(xhr2) {
          console.log(xhr2);
          const button = root.querySelector('input.button');
          button.type = 'button';
          const eventProfile = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
          });
          button.dispatchEvent(eventProfile);
          console.log('create event');
        },
        path: '/user',
        body: {
          username,
          password,
        },
      });
    }
  });
};

export default function createEditProfile() {
  AjaxModule.doGet({
    callback: callbackEditProgile,
    path: '/me',
  });
}