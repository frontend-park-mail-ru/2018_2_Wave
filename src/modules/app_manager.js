import bus from './bus';

class AppManager {
  constructor() {
    this.appClasses = {};
    this.appInstances = {};
    this.startedAppsOrder = [];

    this.started = false;
  }

  /**
   * Initiates AppManager, starts and inits main app
   *
   * @param MainApp
   * @param {HTMLElement} container
   * Element which will contain main app
   */
  async start(MainApp, container) {
    this.mainApp = new MainApp(container);
    await this.mainApp.start();

    this.appContainer = this.mainApp.appContainer;

    this.activeApp = this.mainApp;
    this.activeAppName = 'main';
    this.started = true;

    bus.listen('regApp', this.registerApp.bind(this));
    return this;
  }

  /**
   * Registeres app class
   *
   * @param {String} appName used as unique app url
   * @param {BaseApplication} App app class
   * @memberof AppManager
   */
  registerApp(appName, App) {
    if (appName in this.appClasses) {
      if (this.appClasses[appName] === App) {
        console.log(
          `This app (${appName}) is already registered.`,
        );
        return this;
      }
      throw new Error(
        `Other app with name ${appName} is already registered.`,
      );
    }

    this.appClasses[appName] = App;
    return this;
  }

  /**
   * Checks, if app is known by AppManager, or is MainApp.
   * @param {String} appName
   */
  appExists(appName) {
    return (appName in this.appClasses) || (appName === 'main');
  }


  async openApp(appName, ...params) {
    if (!this.appExists(appName)) {
      throw new Error('App not exists');
    }

    if (!(appName in this.appInstances) && appName !== 'main') {
      const App = this.appClasses[appName];

      this.appInstances[appName] = new App(
        appName, this.appContainer.screen,
      );
    }

    const app = this.appInstances[appName] || this.mainApp;

    if (params) app.processParams(...params);

    if (app !== this.activeApp) {
      await this.hideActiveApp();
      this.activeApp = app;
      this.activeAppName = appName;
      // await launch animation
      // async show bar for 3 seconds
      if (!app.started) {  // CHECK: mainApp.started?
        // show loader
        /* await */ app.start();
        // hide loader
      } else {
        app.resume();  // CHECK: mainApp.resume? unblur there
      }
    }

    this._addToActive_(appName);
  }


  async hideActiveApp() {
    this.activeApp.pause();  // CHECK: mainApp.pause? blur there
    // TODO: hide bar
    // CHECK: is animation needed?
    // CHECK: is app hidden?
  }


  async closeApp(appName) {
    if (!this.appExists(appName)) {
      throw new Error('App not exists');
    }

    // await hide animation

    this.appInstances[appName].stop();
    delete this.appInstances[appName];

    this._removeFromActive_(appName);
  }


  _addToActive_(appName) {
    const index = this.startedAppsOrder.indexOf(appName);
    if (index !== -1) {
      this.startedAppsOrder.splice(index, 1);
    }
    this.startedAppsOrder.push(appName);

    if (this.startedAppsOrder.length >= 5) {
      this.startedAppsOrder[0].stop();
      this.startedAppsOrder.shift();
    }
  }

  _removeFromActive_(appName) {
    const index = this.startedAppsOrder.indexOf(appName);
    if (index !== -1) {
      this.startedAppsOrder.splice(index, 1);
    }
  }
}


export default new AppManager();
