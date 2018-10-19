import bus from './modules/bus';
import Router from './modules/router';

import MenuView from './views/menu/menu';
import createLogin from './views/login/login';
import createRegister from './views/register/register';
import createLeaderboard from './views/leaderboard/leaderboard';
import ProfileView from './views/profile/profile';
import createSettings from './views/settings/settings';
import createEditProfile from './views/editprofile/editprofile';
import createUserblock from './views/userblock/userblock';

import './css/style.css';

const root = document.getElementById('root');

const router = new Router(root);

router
  .register('/', MenuView)
  .register('/profile', ProfileView)
  .start();

// const Menu = new MenuView(root);
// const Profile = new ProfileView(root);

// const pages = {
//   play: Menu.render,
//   menu: Menu.render,
//   login: createLogin,
//   register: createRegister,
//   leaderboard: createLeaderboard,
//   profile: Profile.render,
//   settings: createSettings,
//   editprofile: createEditProfile,
// };


// createUserblock();
// Menu.render();
// Menu.show();
