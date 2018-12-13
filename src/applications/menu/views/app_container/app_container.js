import './app_container.pcss';

import Element from '../../../element';
import template from './app_container.pug';


export default class AppContainer extends Element {
  constructor(parent, wrapper) {
    super(template, parent, wrapper || parent);
    super.render();
  }

  hide() {
    super.hide();
    this.wrapper.style['z-index'] = -5;
  }

  show() {
    super.show();
    this.wrapper.style['z-index'] = 2;
  }
}
