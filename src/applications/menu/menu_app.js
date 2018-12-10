import BaseApp from '../base_app';
import './styles/fonts.pcss';

import Enviroment from './views/env';
import MenuView from './views/menu';
// import LoginView from './views/login';
// import RegisterView from './views/register';
// import LeaderboardView from './views/leaderboard';
// import ProfileView from './views/profile';
// import SettingsView from './views/settings';
// import ProfileEditView from './views/editprofile';

export default class MenuApp extends BaseApp {
  constructor(appUrl, parent) {
    const env = new Enviroment(parent);
    // const Views = {
    //   login: LoginView,
    //   register: RegisterView,
    //   leaderboard: LeaderboardView,
    //   profile: ProfileView,
    //   settings: SettingsView,
    //   'profile/edit': ProfileEditView,
    // };

    // super(appUrl, env.getContainer(), MenuView, Views);
    super(appUrl, parent, MenuView);

    this.env = env;
    this.content = this.env.content;
    this.menu = this.env.menu;

    // this.appWrapper = ???
    // hmmm let me think what kind of shit it should be
  }


  start() {
    this.env.show();
    // super.start();
  }

  // pause() {
  //   this.env.hide();
  //   super.pause();
  // }

  // resume() {
  //   this.env.show();
  //   super.resume();
  // }
}
