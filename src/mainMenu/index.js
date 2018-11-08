import Router from '../modules/router';
import bus from '../modules/bus';

import UserblockView from './userblock/userblock';
import MenuView from './menu/menu';
import LoginView from './login/login';
import RegisterView from './register/register';
import LeaderboardView from './leaderboard/leaderboard';
import ProfileView from './profile/profile';
import SettingsView from './settings/settings';
import ProfileEditView from './editprofile/editprofile';

import './css/style.css';

export default class UserForm {
  constructor() {
    this.userblock = document.getElementById('userblock');
    this.root = document.getElementById('mainmenu_root');

    this.router = new Router(this.root);

    this.router
      .register('/', MenuView)
      .register('/profile', ProfileView)
      .register('/login', LoginView)
      .register('/register', RegisterView)
      .register('/profile/edit', ProfileEditView)
      .register('/settings', SettingsView)
      .register('/leaderboard', LeaderboardView)
      .start();

    this.userblockView = new UserblockView(this.userblock);
    bus.listen('userUpdated', () => { this.userblockView.update(); });
  }
}
