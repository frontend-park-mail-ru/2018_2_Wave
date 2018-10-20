import Router from './modules/router';

import UserblockView from './views/userblock/userblock';
import MenuView from './views/menu/menu';
import LoginView from './views/login/login';
import RegisterView from './views/register/register';
import createLeaderboard from './views/leaderboard/leaderboard';
import ProfileView from './views/profile/profile';
import createSettings from './views/settings/settings';
import createEditProfile from './views/editprofile/editprofile';

import './css/style.css';

// TODO: FIXME: remove id
const userblock = document.getElementById('userblock');
const root = document.getElementById('root');

const router = new Router(root);

router
  .register('/', MenuView)
  .register('/profile', ProfileView)
  .register('/login', LoginView)
  .register('/register', RegisterView)
  .start();

const userblockView = new UserblockView(userblock);
userblockView.update();
