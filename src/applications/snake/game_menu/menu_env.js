import Element from '../../element';

import MenuTemplate from './templates/menu.pug';


export default class Enviroment extends Element {
  constructor(parent) {
    super(MenuTemplate, parent);
    super.render();
  }

  getContainer() {
    [this.content] = this.wrapper.getElementsByClassName('snakemenu-container');
    return this.content;
  }

  show() {
    super.show();
  }
}
