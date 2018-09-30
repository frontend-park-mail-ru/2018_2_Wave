import AjaxModule from '../../modules/ajax';
import './userblock.css';

const userblockTemplate = require('./userblock.pug');

const userblock = document.getElementById('userblock');


export default function createUserblock() {
  const user = {};
  AjaxModule.Get({
    callback(xhr) {
      if (xhr.status === 401) {
        user.authorized = false;
      } else if (xhr.status === 200) {
        user.authorized = true;
        user.avatarSource = JSON.parse(xhr.responseText).avatarSource;
      }
      userblock.innerHTML = userblockTemplate({ user });
    },
    path: '/me',
  });
}
