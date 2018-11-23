import Element from '../../element';

import template from '../templates/env.pug';


export default class Enviroment extends Element {
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
    this.userblock.show();
  }

  async render() {
    this.userblock.render();
  }
}
