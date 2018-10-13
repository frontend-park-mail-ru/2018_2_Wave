import ajax from '../../modules/ajax';
import { validateEdit } from '../validation/validation';

const editProfileTemplate = require('./editprofile.pug');

const root = document.getElementById('root');


function createEditForm() {
  const editProfileForm = root.querySelector('#editProfileForm');
  editProfileForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
      await ajax.GET({
        path: '/user/edit',
        body: new FormData(editProfileForm),
      });
      const ev = new CustomEvent('link', { detail: 'profile' });
      root.dispatchEvent(ev);
    } catch (error) {
      // TODO: show error
      console.log(error);
    }
  });

  validateEdit();
}


export default async function createEditProfile() {
  try {
    const user = await ajax.GET({ path: '/user' });
    root.innerHTML = editProfileTemplate({ user });
    createEditForm();
  } catch (error) {
    console.log(error);
  }
}
