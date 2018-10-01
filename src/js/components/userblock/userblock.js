import './userblock.css';

const userblockTemplate = require('./userblock.pug');

const userblock = document.getElementById('userblock');
const root = document.getElementById('root');


export default function createUserblock() {
  const user = {};
  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://wavebackend.now.sh/me', true);
  // xhr.open('GET', 'http://localhost:8080/me', true);
  xhr.withCredentials = true;

  xhr.onreadystatechange = () => {
    if (xhr.readyState !== 4) {
      return;
    }

    if (xhr.status === 401) {
      user.authorized = false;
      document.getElementById('username').innerHTML = '';
    } else if (xhr.status === 200) {
      user.authorized = true;
      user.avatarSource = JSON.parse(xhr.responseText).avatarSource;
      user.name = JSON.parse(xhr.responseText).username;
      document.getElementById('username').innerHTML = user.name;
    }
    userblock.innerHTML = userblockTemplate({ user });

    if (user.authorized) {
      const profileButton = document.getElementById('userblockAvatar');
      profileButton.addEventListener('click', () => {
        const ev = new CustomEvent('link', { detail: 'profile' });
        root.dispatchEvent(ev);
      });
    }
  };

  xhr.send();
}
