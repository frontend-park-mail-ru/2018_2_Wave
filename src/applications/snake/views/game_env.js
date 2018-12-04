import Element from '../../element';

import GameTemplate from '../templates/game.pug';


export default class Enviroment extends Element {
  constructor(parent) {
    super(GameTemplate, parent);
    super.render();
  }

  getContainer() {
    [this.content] = this.wrapper.getElementsByClassName('game-container');
    return this.content;
  }

  show() {
    super.show();
  }
}
