import BaseView from '../../views/baseview';
import Game from '../index';
import GAME_MODES from '../modes';

import snakeTemplate from '../index.pug';

export default class GameView extends BaseView {
  constructor(parent) {
    super(snakeTemplate, parent);
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

  show() {
    super.show();
    this.render();
  }

  render() {
    super.render();
  }

  destroy() {
    this.game.destroy();
    return this;
  }

  create() {
    super.create();

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

    this.game = new Game(mode);
    this.game.start();
  }
}
