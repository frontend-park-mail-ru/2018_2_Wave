import './userblock.css';
import ajax from '../../modules/ajax';

const userblockTemplate = require('./userblock.pug');

const userblock = document.getElementById('userblock');
const root = document.getElementById('root');


export default async function createUserblock() {
  const user = {};

  try {
    const data = await ajax.GET({ path: '/user' });
    user.authorized = true;
    user.avatarSource = data.avatarSource;
    user.name = data.username;
    document.getElementById('username').innerHTML = user.name;
    userblock.innerHTML = userblockTemplate({ user });

    const profileButton = document.getElementById('userblockAvatar');
    profileButton.addEventListener('click', () => {
      const ev = new CustomEvent('link', { detail: 'profile' });
      root.dispatchEvent(ev);
    });
  } catch (error) {
    console.error(error);
    user.authorized = false;
    document.getElementById('username').innerHTML = '';
    userblock.innerHTML = userblockTemplate({ user });
  }
}
