export default class BaseApp {
  constructor(parent, MainView, Views) {
    this.parent = parent;
    this.views = { main: new MainView(this.parent) };
    this.currentView = this.views.main;

    if (Views) {
      Object.keys(Views).forEach((key) => {
        this.views[key] = new Views[key](this.parent);
      });
    }

    this.active = false;
  }


  changeView(viewName) {
    // анимульки смены вьюх писать в переопределённом методе,
    // не забыв вызвать super.changeView()
    if (!this.views.hasOwnProperty(viewName)) {
      console.error('No such view');
      return;
    }
    this.currentView.hide();
    this.currentView = this.views[viewName];
    if (this.active) this.currentView.show();
  }


  start() {
    this.active = true;
    this.currentView.show();
  }

  stop() {
    this.active = false;
    this.currentView.hide();
    this.parent.innerHTML = '';
  }

  pause() {
    this.active = false;
    this.currentView.hide();
  }

  resume() {
    this.active = true;
    this.currentView.show();
  }
}
