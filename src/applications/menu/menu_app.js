import BaseApp from '../base_app';

import Enviroment from './views/env';
import MenuView from './views/menu';
import LoginView from './views/login';
import RegisterView from './views/register';
import LeaderboardView from './views/leaderboard';
import ProfileView from './views/profile';
import SettingsView from './views/settings';
import ProfileEditView from './views/editprofile';

import './styles/style.css';


export default class MenuApp extends BaseApp {
  constructor(appUrl, parent) {
    const env = new Enviroment(parent);
    const Views = {
      login: LoginView,
      register: RegisterView,
      leaderboard: LeaderboardView,
      profile: ProfileView,
      settings: SettingsView,
      'profile/edit': ProfileEditView,
    };

    super(appUrl, env.getContainer(), MenuView, Views);

    this.env = env;
    this.content = this.env.getContainer();

    // this.appWrapper = ???
    // hmmm let me think what kind of shit it should be
  }


  start() {
    this.env.show();
    super.start();

    if (document.requestFullscreen) {
      document.requestFullscreen();
    } else if (document.mozRequestFullScreen) {
      document.mozRequestFullScreen();
    } else if (document.webkitRequestFullscreen) {
      document.webkitRequestFullscreen();
    }
  }

  // stop() {
  //   console.error('Cannot stop main app');
  // }

  pause() {
    this.env.hide();
    super.pause();
  }

  resume() {
    this.env.show();
    super.resume();
  }
}
