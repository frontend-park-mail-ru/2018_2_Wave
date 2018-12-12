import Element from '../../element';

import GameTemplate from '../templates/game.pug';


export default class Enviroment extends Element {
  constructor(parent) {
    super(GameTemplate, parent, ['game-container'], 'application');
    super.render();
  }

  getContainer() {
    return this.wrapper;
  }

  show() {
    super.show();
  }
}
