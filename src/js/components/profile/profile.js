import AjaxModule from '../../modules/ajax';
import './profile.css';

const profileTemplate = require('./profile.pug');

const root = document.getElementById('root');


const createProfileCallback = (xhr) => {
  console.log(xhr);
  const user = JSON.parse(xhr.responseText);
  console.log(user);
  root.innerHTML = profileTemplate({
    user,
  });
};


export default function createProfile() {
  AjaxModule.doGet({
    callback: createProfileCallback,
    path: '/me',
  });
}
