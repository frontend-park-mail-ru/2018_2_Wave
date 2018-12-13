import './styles/fonts.pcss';

import BaseApp from '../base_app';

import Enviroment from './views/enviroment/env';
import LibraryView from './views/library/library';
import AppContainer from './views/app_container/app_container';
// import LoginView from './views/login';
// import RegisterView from './views/register';
// import LeaderboardView from './views/leaderboard';
// import ProfileView from './views/profile';
// import SettingsView from './views/settings';
// import ProfileEditView from './views/editprofile';

export default class MenuApp extends BaseApp {
  constructor(appUrl, parent) {
    // const envWrapper = document.createElement('div');
    // envWrapper.classList.add('envWrapper');
    // const env = new Enviroment(parent, envWrapper);
    const env = new Enviroment(parent, parent);
    // const Views = {
    //   login: LoginView,
    //   register: RegisterView,
    //   leaderboard: LeaderboardView,
    //   profile: ProfileView,
    //   settings: SettingsView,
    //   'profile/edit': ProfileEditView,
    // };

    super(appUrl, env.contentPlace, LibraryView);

    this.env = env;
    this.content = this.env.content;
    this.menu = this.env.menu;

    this.appContainer = new AppContainer(
      this.env.appContainerPlace,
      this.env.appContainerPlace,
    );
  }


  start() {
    this.appContainer.hide();
    this.env.show();
    super.start();
  }

  pause() {
    this.active = false;
    this.env.mainContainer.classList.add('blurred');
    this.appContainer.show();
  }

  resume() {
    if (!this.started) {
      this.start();
      return;
    }

    this.active = true;

    const { mainContainer } = this.env;

    mainContainer.classList.remove('blurred');
    mainContainer.classList.add('unblurred');
    mainContainer.addEventListener('animationend', () => {
      mainContainer.classList.remove('unblurred');
      this.appContainer.hide();
    }, { once: true });
  }
}
