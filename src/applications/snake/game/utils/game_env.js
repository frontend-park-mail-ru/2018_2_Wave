import Element from '../../../element';

import SnakeGameTemplate from '../templates/snakegame.pug';

export default class Enviroment extends Element {
  constructor(parent) {
    super(SnakeGameTemplate, parent);
    super.render();
  }

  getContainer() {
    [this.content] = this.wrapper.getElementsByClassName('snakegame-container');
    return this.content;
  }

  getCanvas() {
    [this.canvas] = this.wrapper.getElementsByClassName('snakegame-canvas');
    return this.canvas;
  }

  show() {
    super.show();
  }
}