export default class BaseApp {
  constructor(appURL, parent, MainView, Views) {
    this.url = appURL;
    this.views = { main: new MainView(parent, appURL) };
    this.currentView = this.views.main;

    if (Views) {
      Object.keys(Views).forEach((key) => {
        this.views[key] = new Views[key](parent);
      });
    }

    this.active = false;
    this.started = false;
  }


  changeView(viewUrl, params) {
    // write view change animations in overridden method
    // do not forget to call super.changeView() first!
    if (!this.views.hasOwnProperty(viewUrl)) {
      console.error('No such view');
      this.currentView = this.views.main;
    } else {
      this.currentView.hide();
      this.currentView = this.views[viewUrl];
    }

    this.currentView.render(params);
    if (this.active) this.currentView.show();
  }


  start() {
    this.started = true;
    this.active = true;
    if (this.currentView.start) {
      this.currentView.start();
    }
    this.currentView.show();
  }

  stop() {
    this.started = false;
    this.active = false;
    this.currentView.hide();
    this.parent.innerHTML = '';
  }

  pause() {
    this.active = false;
    this.currentView.hide();
  }

  resume() {
    if (!this.started) {
      this.start();
      return;
    }
    this.active = true;
    this.currentView.show();
  }
}
