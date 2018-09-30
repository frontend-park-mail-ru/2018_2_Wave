import createMenu from './components/menu/menu';
import createLogin from './components/login/login';
import createRegister from './components/register/register';
import createLeaderboard from './components/leaderboard/leaderboard';
import createProfile from './components/profile/profile';
import createSettings from './components/settings/settings';
import createEditProfile from './components/editprofile/editprofile';

import css from '../css/style.css';

const root = document.getElementById('root');


const pages = {
  play: createMenu,
  menu: createMenu,
  login: createLogin,
  register: createRegister,
  leaderboard: createLeaderboard,
  profile: createProfile,
  settings: createSettings,
  editprofile: createEditProfile,
};


root.addEventListener('click', (event) => {
  console.log('event');
  if ((!event.target.getAttribute('datahref'))
  || (event.target.getAttribute('type') === 'submit')) {
    return;
  }

  event.preventDefault();

  pages[event.target.getAttribute('datahref')]();
});

createMenu();
