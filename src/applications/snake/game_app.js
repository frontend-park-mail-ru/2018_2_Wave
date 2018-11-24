import GAME_MODES from './game/core/modes';


import BaseApp from '../base_app';

import GameEnv from './views/env';
import GameView from './views/game_field';
import Game from './game/game';

import css from './style.css';


export default class SnakeApp extends BaseApp {
  constructor(appUrl, parent) {
    const env = new GameEnv(parent);
    super(appUrl, env.getContainer(), GameView);

    this.env = env;
    this.gameContainer = this.views.main.getCanvas();
  }


  start() {
    this.env.show();
    super.start();

    this.initGame();
  }

  pause() {
    this.env.hide();
    super.pause();


    // TODO: FIXME: achtung!!!
    this.game.destroy();
  }

  resume() {
    this.env.show();
    super.resume();
  }


  stop() {
    this.game.destroy();
  }


  initGame() {
    // TODO think about chosing game mode
    /*
    if (pathname === '/game/online-mode') {
      mode = GAME_MODES.ONLINE;
    } else {
      mode = GAME_MODES.OFFLINE;
    }
    */


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
      windowHeight: 500,
    };

    const mode = navigator.onLine
      ? GAME_MODES.ONLINE
      : GAME_MODES.OFFLINE;
    this.game = new Game(mode, this.gameContainer, gameInitData);

    // TODO: FIXME: call this in view after button press!
    this.game.start();
  }
}
