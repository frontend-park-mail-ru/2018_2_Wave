import Router from './modules/router';

import UserblockView from './views/userblock/userblock';
import MenuView from './views/menu/menu';
import LoginView from './views/login/login';
import RegisterView from './views/register/register';
import LeaderboardView from './views/leaderboard/leaderboard';
import ProfileView from './views/profile/profile';
import SettingsView from './views/settings/settings';
import ProfileEditView from './views/editprofile/editprofile';

import './css/style.css';


const [root] = document.getElementsByClassName('root');

new Router(root)
  .setEnviroment(UserblockView)
  .register('/', MenuView)
  .register('/profile', ProfileView)
  .register('/login', LoginView)
  .register('/register', RegisterView)
  .register('/profile/edit', ProfileEditView)
  .register('/settings', SettingsView)
  .register('/leaderboard', LeaderboardView)
  .start();
