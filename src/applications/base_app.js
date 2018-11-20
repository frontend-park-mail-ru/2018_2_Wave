export default class BaseApp {
  constructor(appURL, parent, MainView, Views) {
    this.url = appURL;
    this.parent = parent;
    this.views = { main: new MainView(this.parent) };
    this.currentView = this.views.main;

    if (Views) {
      Object.keys(Views).forEach((key) => {
        this.views[key] = new Views[key](this.parent);
      });
    }

    this.active = false;
    this.started = false;
  }


  changeView(viewUrl, params) {
    // write view change animations in overridden method
    // do not forget to call super.changeView() first!
    this.currentView.hide();
    if (!this.views.hasOwnProperty(viewUrl)) {
      console.error('No such view');
      this.currentView = this.views.main;
    } else {
      this.currentView = this.views[viewUrl];
    }

    this.currentView.render(params);
    if (this.active) this.currentView.show();
  }


  start() {
    this.started = true;
    this.active = true;
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
