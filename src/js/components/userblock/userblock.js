import AjaxModule from '../../modules/ajax';
import './userblock.css';


// const userblockTemplate = require('./userblock.pug');

const userblock = document.getElementById('userblock');


export default function createUserblock() {
  userblock.innerHTML = '';
  AjaxModule.Get({
    callback(xhr) {
      if (xhr.status === 401) {
        const a = document.createElement('a');
        a.id = 'loginbutton';
        a.setAttribute('datahref', 'login');
        a.innerHTML = 'login';
        userblock.appendChild(a);
      } else if (xhr.status === 200) {
        // show avatar
        const avatar = document.createElement('img');
        const { avatarSource } = JSON.parse(xhr.responseText);
        avatar.setAttribute('src', avatarSource);
        userblock.appendChild(avatar);
      }
    },
    path: '/me',
  });
}
