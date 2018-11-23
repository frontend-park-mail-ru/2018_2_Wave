import Element from '../../element';
import Game from '../game/core/game';
import GAME_MODES from '../game/core/modes';

import template from '../templates/game.pug';

export default class GameView extends Element {
  constructor(parent) {
    super(template, parent);
    this.game = null;

    // on the future
    /*
    this.bus.on('CLOSE_GAME', () => {
      if (this.active) {
        this.router.open('/');
      }
    });
    */
  }


  destroy() {
    this.game.destroy();
    return this;
  }

  create() {
    // super.create();

    this.doGame();
    return this;
  }

  doGame() {
    let mode = '';
    // TODO think about chosing game mode
    /*
    if (pathname === '/game/online-mode') {
      mode = GAME_MODES.ONLINE;
    } else {
      mode = GAME_MODES.OFFLINE;
    }
    */

    if (navigator.onLine) {
      mode = GAME_MODES.ONLINE;
    } else {
      mode = GAME_MODES.OFFLINE;
    }

    const gameInitData = {
      snakeText: 'qwertyuiopqe',
      DOMRect: {
        x: 10,
        y: 10,
        width: 18,
        height: 18,
      },
      // windowWidth: window.innerWidth,
      // windowHeight: window.innerHeight,
      windowWidth: 800,
      windowHeight: 800,
    };

    this.game = new Game(mode, this.wrapper, gameInitData);
    this.game.start();
  }
}
