import './styles/fonts.pcss';

import BaseApp from '../base_app';

import Enviroment from './views/enviroment/env';
import LibraryView from './views/library/library';
import StoreView from './views/store/store';
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
    super(appUrl, env.contentPlace);

    const [libraryPlace] = env.wrapper.getElementsByClassName('library');
    this.views.main = new LibraryView(libraryPlace, libraryPlace);
    this.currentView = this.views.main;

    const [storePlace] = env.wrapper.getElementsByClassName('store');
    this.views.store = new StoreView(storePlace, storePlace);

    this.env = env;
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

  changeView(...args) {
    if (this.currentView === this.views.store) this.menu.show();
    super.changeView(...args);
    this.env.setTitle(this.currentView.title);
    if (this.currentView === this.views.store) this.menu.hide();
  }
}
