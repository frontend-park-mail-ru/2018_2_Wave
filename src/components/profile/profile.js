import ajax from '../../modules/ajax';
import './profile.css';

const profileTemplate = require('./profile.pug');

const root = document.getElementById('root');


export default async function createProfile() {
  try {
    const user = await ajax.GET({ path: '/user' });
    root.innerHTML = profileTemplate({ user });
    const logout = document.getElementById('logoutbutton');
    logout.addEventListener('click', () => {
      ajax.POST({ path: '/user/logout' });
    });
  } catch (error) {
    console.log(error);
  }
}
