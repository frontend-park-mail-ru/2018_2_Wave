import BaseView from '../baseview';

const template = require('./settings.pug');


export default class SettingsView extends BaseView {
  constructor(parent) {
    super(template, parent);
    this.single = true;
  }

  show() {
    super.show();
    this.render();
  }
}
