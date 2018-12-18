import './app_container.pcss';

import Element from '../../../element';
import template from './app_container.pug';


export default class AppContainer extends Element {
  constructor(parent, wrapper) {
    super(template, parent, wrapper || parent);
    super.render();
    [this.screen] = this.wrapper.getElementsByClassName('screen');
    [this.bar] = this.wrapper.getElementsByClassName('bar');
    // this.bar.hidden = true;
  }

  hide() {
    this.wrapper.style['z-index'] = -5;
    super.hide();
  }

  show() {
    super.show();
    this.wrapper.style['z-index'] = 2;
  }
}
