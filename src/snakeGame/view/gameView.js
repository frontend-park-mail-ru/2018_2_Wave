import BaseView from '../../views/baseview';
import Game from '../index';
import GAME_MODES from '../modes';

import snakeTemplate from '../index.pug';

export default class GameView extends BaseView {
  constructor(parent) {
    super(snakeTemplate, parent);
    this.canvas = null;
    this.game = null;

    this.bus.on('CLOSE_GAME', () => {
      if (this.active) {
        this.router.open('/');
      }
    });
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

  create(attrs) {
    super.create(attrs);
    this.canvas = this.el.querySelector('.js-canvas');
    this.ctx = this.canvas.getContext('2d');

    this.doGame(attrs);
    return this;
  }

  doGame(pathname) {
    let mode = '';
    if (pathname === '/game/online-mode') {
      mode = GAME_MODES.ONLINE;
    } else {
      mode = GAME_MODES.OFFLINE;
    }
    this.game = new Game(mode, this.canvas);
    this.game.start();
  }

  do7() {
    const ctx = this.ctx;
    const canvas = this.canvas;
    const scene = new Scene(ctx);

    let start = performance.now();

    function render(now) {
      const delay = (now - start) / 100;
      start = now;


      scene.render();
      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }
}
