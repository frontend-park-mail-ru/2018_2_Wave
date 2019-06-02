import './styles/fonts.pcss';

import BaseApp from '../base_app';

import Enviroment from './views/enviroment/env';
import AppContainer from './views/app_container/app_container';
import HomeView from './views/home/home';
import StoreView from './views/store/store';
// import ProfileView from './views/profile/profile';
// import Bar from './components/bar/bar';
// import AppContainer from './views/app_container/app_container';
// import AboutView from './views/about/about';
import bus from '../../modules/bus';


/**
 * Main application class.
 * Supplies appContainer component, which is already placed in layout.
 * Has root url.
 *
 * @class MainApp
 * @extends {BaseApp}
 */
export default class MainApp extends BaseApp {
  constructor(parent) {
    super('/', parent);

    this.env = new Enviroment(parent);

    this.appContainer = new AppContainer(parent);

    this.homeContentBlock = new HomeView(this.env);
    this.storeContentBlock = new StoreView(this.env);
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

    // this.bar = new Bar(
    //   this.env.appContainerPlace,
    //   this.env.appContainerPlace,
    // );

    // this.pause = this.sleep.bind(this);
    // this.resume = this.wakeup.bind(this);
  }


  async start() {
    // TODO: move this to mainapp.renderPromise, await in start
    await this.env.render();
    await this.appContainer.render();
    await this.homeContentBlock.render();
    await this.storeContentBlock.render();

    this.env.show();

    // this.homeContentBlock.hide();
    this.storeContentBlock.hide();

    bus.listen('loaderHidden', this.unblur.bind(this));
  }


  async blur() {
    this.env.body.classList.add('blurred');
    return new Promise((resolve) => {
      this.env.body.addEventListener('animationend', () => {
        resolve();
      }, { once: true });
    });
  }

  async unblur() {
    this.env.body.classList.remove('blurred');
    this.env.body.classList.add('unblurred');
    return new Promise((resolve) => {
      this.env.body.addEventListener('animationend', () => {
        this.env.body.classList.remove('unblurred');
        resolve();
      }, { once: true });
    });
  }

  // resume() {
  //   console.log('mainApp.resume used');
  //   if (!this.started) {
  //     this.start();
  //     return;
  //   }
  //   if (this.loader.active) {
  //     console.log('loader active');
  //     bus.emit('link', '/terminal');
  //   } else {
  //     console.log('loader is not active');
  //     this.animateLaunch();
  //     this.env.title.focus();
  //     this.active = true;
  //   }
  // }

  // FIXME move this to changeView
  processParams(view) {
    console.log(`mainapp: processing view ${view}`);

    if (view === 'store') {
      this.homeContentBlock.hide();
      this.storeContentBlock.show();
    } else if (view === 'home') {
      this.storeContentBlock.hide();
      this.homeContentBlock.show();
    }
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
