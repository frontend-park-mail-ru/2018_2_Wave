import './styles/fonts.pcss';

import BaseApp from '../base_app';

import Enviroment from './views/enviroment/env';
// import HomeView from './views/home/home';
// import StoreView from './views/store/store';
import LoaderView from './views/loader/loader';
// import ProfileView from './views/profile/profile';
// import Bar from './components/bar/bar';
// import AppContainer from './views/app_container/app_container';
// import AboutView from './views/about/about';
import bus from '../../modules/bus';


export default class MenuApp extends BaseApp {
  constructor(appUrl, parent) {
    super(appUrl);
    const env = new Enviroment(parent);

    this.loaderView = new LoaderView(
      { parent: env, markTag: 'loader' },
    );

    // const [homePlace] = env.wrapper.getElementsByClassName('home-page');
    // this.views.main = new HomeView(homePlace, homePlace);
    // this.currentView = this.views.main;

    // const [storePlace] = env.wrapper.getElementsByClassName('store');
    // const storeView = new StoreView(storePlace, storePlace, this.views);
    // this.views.store = storeView;

    // const [profilePlace] = env.wrapper.getElementsByClassName('profile');
    // const profileView = new ProfileView(profilePlace, profilePlace, this.views);
    // this.views.profile = profileView;

    // const [aboutPlace] = env.wrapper.getElementsByClassName('about');
    // const aboutView = new AboutView(aboutPlace, aboutPlace, this.views);
    // this.views.about = aboutView;

    // this.env = env;
    // this.views.env = this.env;
    // this.menu = this.env.menu;

    // this.bar = new Bar(
    //   this.env.appContainerPlace,
    //   this.env.appContainerPlace,
    // );

    // this.appContainer = new AppContainer(
    //   this.env.appContainerPlace,
    //   this.env.appContainerPlace,
    // );
  }

  animateLaunch() {
    const { mainContainer } = this.env;

    mainContainer.classList.remove('blurred');
    mainContainer.classList.add('unblurred');
    mainContainer.addEventListener('animationend', () => {
      mainContainer.classList.remove('unblurred');
      this.appContainer.hide();
    }, { once: true });
  }


  start() {
    this.appContainer.hide();
    this.env.show();
    this.started = true;
    this.active = true;
    this.currentView.show();
  }

  pause() {
    this.active = false;
    this.env.mainContainer.classList.add('blurred');
    this.appContainer.show();
    document.activeElement.blur();
  }

  resume() {
    if (!this.started) {
      this.start();
      return;
    }
    if (this.loader.active) {
      console.log('loader active');
      bus.emit('link', '/terminal');
    } else {
      console.log('loader is not active');
      this.animateLaunch();
      this.env.title.focus();
      this.active = true;
    }
  }

  stop() {
    this.pause();
  }

  changeView(viewUrl, params) {
    if (!this.views.hasOwnProperty(viewUrl)) {
      console.error('No such view');
      this.currentView = this.views.main;
    } else {
      this.currentView.hide();
      this.currentView = this.views[viewUrl];
    }

    this.env.setTitle(this.currentView.title);
    if (!this.currentView.rendered) this.currentView.render();
    this.currentView.show();
  }
}
