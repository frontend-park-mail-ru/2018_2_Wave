import './userblock.css';
import AjaxModule from '../../modules/ajax';

const userblockTemplate = require('./userblock.pug');

const userblock = document.getElementById('userblock');
const root = document.getElementById('root');


export default function createUserblock() {
  const user = {};

  AjaxModule.Get({
    method: 'GET',
    path: '/user',
    callback: {
      success: (data) => {
        user.avatarSource = data.avatarSource;
        user.name = data.username;
        document.getElementById('username').innerHTML = user.name;
        userblock.innerHTML = userblockTemplate({ user });

        const profileButton = document.getElementById('userblockAvatar');
        profileButton.addEventListener('click', () => {
          const ev = new CustomEvent('link', { detail: 'profile' });
          root.dispatchEvent(ev);
        });
      },
      failure: () => {
        user.authorized = false;
        document.getElementById('username').innerHTML = '';
        userblock.innerHTML = userblockTemplate({ user });
      },
    },
  });
}
