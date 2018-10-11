import AjaxModule from '../../modules/ajax';
import './profile.css';

const profileTemplate = require('./profile.pug');

const root = document.getElementById('root');


export default function createProfile() {
  AjaxModule.Get({
    path: '/user',
    callback: {
      success: (user) => {
        root.innerHTML = profileTemplate({ user });
        const logout = document.getElementById('logoutbutton');
        logout.addEventListener('click', () => {
          AjaxModule.Post({ path: '/user/logout' });
        });
      },
    },
  });
}
