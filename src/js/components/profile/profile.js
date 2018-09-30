import AjaxModule from '../../modules/ajax';
import './profile.css';

const profileTemplate = require('./profile.pug');

const root = document.getElementById('root');

const createProfileCallback = (response) => {
  response.json().then((user) => {
    root.innerHTML = profileTemplate({ user });
  });
};


export default function createProfile() {
  AjaxModule.Get({
    callback: createProfileCallback,
    path: '/me',
  });
}
