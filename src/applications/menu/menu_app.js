import BaseApp from '../base_app';

import MenuView from './views/menu';
import UserblockView from './views/userblock';
import LoginView from './views/login';
import RegisterView from './views/register';
import LeaderboardView from './views/leaderboard';
import ProfileView from './views/profile';
import SettingsView from './views/settings';
import ProfileEditView from './views/editprofile';

import './styles/style.css';

export default class MenuApp extends BaseApp {
  constructor(appUrl, parent) {
    const Views = {
      userblock: UserblockView,
      login: LoginView,
      register: RegisterView,
      leaderboard: LeaderboardView,
      profile: ProfileView,
      settings: SettingsView,
      'profile/edit': ProfileEditView,
    };

    super(appUrl, parent, MenuView, Views);

    this.env = this.views.userblock;
  }


  start() {
    this.env.show();
    super.start();
  }

  pause() {
    this.env.hide();
    super.pause();
  }

  resume() {
    super.resume();
    this.env.show();
  }
}
