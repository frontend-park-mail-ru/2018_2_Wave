import Router from './modules/router';
import bus from './modules/bus';

import UserblockView from './views/userblock/userblock';
import MenuView from './views/menu/menu';
import LoginView from './views/login/login';
import RegisterView from './views/register/register';
import LeaderboardView from './views/leaderboard/leaderboard';
import ProfileView from './views/profile/profile';
import SettingsView from './views/settings/settings';
import ProfileEditView from './views/editprofile/editprofile';

import './css/style.css';


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js', { scope: '/' })
    .then((registration) => {
      // Registration was successful
      console.log('SW registration OK:', registration);
    })
    .catch((err) => {
      // registration failed :(
      console.log('SW registration FAIL:', err);
    });
}


// TODO: FIXME: remove id
const userblock = document.getElementById('userblock');
const root = document.getElementById('root');

const router = new Router(root);

router
  .register('/', MenuView)
  .register('/profile', ProfileView)
  .register('/login', LoginView)
  .register('/register', RegisterView)
  .register('/profile/edit', ProfileEditView)
  .register('/settings', SettingsView)
  .register('/leaderboard', LeaderboardView)
  .start();

const userblockView = new UserblockView(userblock);
bus.listen('userUpdated', () => { userblockView.update(); });
