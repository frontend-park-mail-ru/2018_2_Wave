import Element from '../../element';

import GameTemplate from '../templates/game.pug';


export default class Enviroment extends Element {
  constructor(parent) {
    super(GameTemplate, parent, false, ['game-container']);
    super.render();
  }

  getContainer() {
    return this.wrapper;
  }

  show() {
    super.show();
  }
}
