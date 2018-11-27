import Element from '../../element';

import template from '../templates/game.pug';


export default class GameView extends Element {
  constructor(parent) {
    super(template, parent);

    // on the future
    /*
    this.bus.on('CLOSE_GAME', () => {
      if (this.active) {
        this.router.open('/');
      }
    });
    */
  }

  getCanvas() {
    if (!this.rendered) this.render();
    [this.canvas] = this.wrapper.getElementsByClassName('canvas');
    return this.canvas;
  }
}
