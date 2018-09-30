import AjaxModule from '../../modules/ajax';
import './userblock.css';


// const userblockTemplate = require('./userblock.pug');

const userblock = document.getElementById('userblock');

const createUserblockCallback = (response) => {
  if (response.status === 401) {
    const a = document.createElement('a');
    a.id = 'loginbutton';
    a.setAttribute('datahref', 'login');
    a.innerHTML = 'login';
    userblock.appendChild(a);
  } else if (response.status === 200) {
    // show avatar
    response.json().then((user) => {
      const avatar = document.createElement('img');
      const { avatarSource } = user;
      avatar.setAttribute('src', avatarSource);
      userblock.appendChild(avatar);
    });
  }
};


export default function createUserblock() {
  userblock.innerHTML = '';
  AjaxModule.Get({
    callback: createUserblockCallback,
    path: '/me',
  });
}
