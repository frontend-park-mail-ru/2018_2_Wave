import BaseView from '../baseview';

const template = require('./settings.pug');


export default class SettingsView extends BaseView {
  constructor(parent) {
    super(template, parent);
  }

  show() {
    super.show();
    this.render();
  }
}
