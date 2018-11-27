import Element from '../../element';

const template = require('../templates/settings.pug');


export default class SettingsView extends Element {
  constructor(parent) {
    super(template, parent);
    this.single = true;
  }

  show() {
    super.show();
    this.render();
  }
}
