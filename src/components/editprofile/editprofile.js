import AjaxModule from '../../modules/ajax';
import validateEdit from '../validation/validation';

const editProfileTemplate = require('./editprofile.pug');

const root = document.getElementById('root');

function createEditForm() {
  const editProfileForm = root.querySelector('#editProfileForm');
  editProfileForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(editProfileForm);
    AjaxModule.Post({
      path: '/user/edit',
      body: formData,
      callback: {
        success: () => {
          const ev = new CustomEvent('link', { detail: 'profile' });
          root.dispatchEvent(ev);
        },
        failure: (error) => {
          // TODO: show error
          console.log(error);
        },
      },
    });
  });
  validateEdit();
}


export default function createEditProfile() {
  AjaxModule.Get({
    path: '/user',
    callback: {
      success: (user) => {
        root.innerHTML = editProfileTemplate({ user });
        createEditForm();
      },
    },
  });
}
