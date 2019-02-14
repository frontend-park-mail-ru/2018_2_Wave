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
    this.started = true;

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

  appExists(appName) {
    return appName in this.appClasses;
  }


  async openApp(appName, ...params) {
    if (!this.appExists(appName)) {
      throw new Error('App not exists');
    }

    if (!(appName in this.appInstances)) {
      const App = this.appClasses[appName];

      this.appInstances[appName] = new App(
        appName,
        this.appContainer.screen,
      );
    }

    const app = this.appInstances[appName];

    if (params) {
      app.processParams(...params);
    }

    if (app !== this.activeApp) { // TODO: // FIXME hide last app
      // await launch animation
      // async show bar for 3 seconds
      if (!app.started) {
        // show loader
        /* await */ app.start();
        // hide loader
      } else {
        app.resume();
      }
    }

    this._addToActive_(appName);
  }

  async hideApp(appName) {
    if (!this.appExists(appName)) {
      throw new Error('App not exists');
    }

    // await hide animation

    this.appInstances[appName].pause();
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
