import BaseView from '../../base_view';

const template = require('../templates/settings.pug');


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
