import './styles/fonts.pcss';

import BaseApp from '../base_app';

import Enviroment from './views/enviroment/env';
import AppContainer from './views/app_container/app_container';
import HomeView from './views/home/home';
// import StoreView from './views/store/store';
// import ProfileView from './views/profile/profile';
// import Bar from './components/bar/bar';
// import AppContainer from './views/app_container/app_container';
// import AboutView from './views/about/about';
import bus from '../../modules/bus';


export default class MainApp extends BaseApp {
  constructor(parent) {
    super('/', parent);

    this.env = new Enviroment(parent);

    this.appContainer = new AppContainer(parent);

    // this.homeContentBlock = new HomeView(
    // );
    // this.currentView = this.views.main;

    // const [storePlace] = this.env.body.getElementsByClassName('store');
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
  }

  animateLaunch() {
    const mainContainer = this.env.body;

    this.env.show();
    mainContainer.classList.remove('blurred');
    mainContainer.classList.add('unblurred');
    mainContainer.addEventListener('animationend', () => {
      mainContainer.classList.remove('unblurred');
      this.appContainer.hide();
    }, { once: true });
  }


  async start() {
    // TODO: move this to mainapp.renderPromise, await in start
    await this.env.render();
    await this.appContainer.render();
    this.env.show();
    bus.listen('loaderHidden', () => this.animateLaunch());
  }

  pause() {
    this.active = false;
    this.env.mainContainer.classList.add('blurred');
    this.appContainer.show();  // CHECK: sure?
    document.activeElement.blur();  // CHECK: wtf?
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
