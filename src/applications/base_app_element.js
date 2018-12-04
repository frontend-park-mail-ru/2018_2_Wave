import BaseApp from './base_app';

export default class AppElement extends BaseApp {
  constructor(appURL, parent, MainView, Views) {
    super(appURL, parent, MainView, Views);
    this.parent   = parent;
  }

  start() {
    this.show();
    super.start();
  }

  hide() {
    this.parent.parentNode.hidden = true;
  }

  show() {
    this.parent.parentNode.hidden = false;
  }
}
