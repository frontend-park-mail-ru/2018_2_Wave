import Element from '../../element';

import template from '../templates/env.pug';


export default class GameEnv extends Element {
  constructor(parent) {
    super(template, parent);
  }

  getContainer() {
    if (!this.rendered) super.render();
    [this.content] = this.wrapper.getElementsByClassName('content');
    return this.content;
  }
}
