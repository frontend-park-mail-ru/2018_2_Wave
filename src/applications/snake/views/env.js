import Element from '../../element';

import template from '../templates/env.pug';


export default class GameEnv extends Element {
  constructor(parent) {
    super(template, parent);
    super.render();
  }

  getContainer() {
    [this.content] = this.wrapper.getElementsByClassName('content');
    return this.content;
  }

  show() {
    super.show();
  }
}
