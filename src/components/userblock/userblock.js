import './userblock.css';

const userblockTemplate = require('./userblock.pug');

const userblock = document.getElementById('userblock');
const root = document.getElementById('root');


export default function createUserblock() {
  const user = {};

  fetch('https://rasseki.com/user', {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  }).then((response) => {
    if (response.status === 401) {
      user.authorized = false;
      document.getElementById('username').innerHTML = '';
      userblock.innerHTML = userblockTemplate({ user });
    } else {
      user.authorized = true;
      return response.json();
    }
  }).then((data) => {
    user.avatarSource = data.avatarSource;
    user.name = data.username;
    document.getElementById('username').innerHTML = user.name;
    userblock.innerHTML = userblockTemplate({ user });

    const profileButton = document.getElementById('userblockAvatar');
    profileButton.addEventListener('click', () => {
      const ev = new CustomEvent('link', { detail: 'profile' });
      root.dispatchEvent(ev);
    });
  });
}
