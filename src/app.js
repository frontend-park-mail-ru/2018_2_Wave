import createMenu from './components/menu/menu';
import createLogin from './components/login/login';
import createRegister from './components/register/register';
import createLeaderboard from './components/leaderboard/leaderboard';
import createProfile from './components/profile/profile';
import createSettings from './components/settings/settings';
import createEditProfile from './components/editprofile/editprofile';
import createUserblock from './components/userblock/userblock';

import './css/style.css';

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


document.addEventListener('click', (event) => {
  if (!(event.target instanceof HTMLAnchorElement)
  || (event.target.getAttribute('type') === 'submit')) {
    return;
  }

  event.preventDefault();
  const link = event.target;

  createUserblock();
  pages[link.getAttribute('datahref')]();
});


root.addEventListener('link', (event) => {
  /* this event dispatches after
   * logging in, registering and
   * profile update */
  createUserblock();

  pages[event.detail]();
});

createUserblock();
createMenu();
