import busController from '../../modules/busController';
import Game from '../game';
import GAME_MODE from '../core/modes';

import SnakeGameTemplate from '../templates/snakegame.pug';
import WsPostman from '../../modules/wsPostman';

import Element from '../../../element';

export default class GameView extends Element {
  constructor(parent) {
    super(SnakeGameTemplate, parent, 'snakegame-container');
  }

  show() {
    super.show();
    this.setGameParams();
  }

  render(gameParams) {
    this.gameParams = gameParams;
    super.render();
  }

  sendAddToRoom() {
    this.wsPostman = new WsPostman();
    this.wsPostman.addToRoom();
    this.startMultiplayer = this.startMultiplayer.bind(this);
    busController.setBusListeners({ STATUS_TICK: this.startMultiplayer });
  }

  startMultiplayer(payload) {
    busController.removeBusListeners({ STATUS_TICK: this.startMultiplayer });
    const [canvasWrapper] = this.wrapper.getElementsByClassName('canvas-wrapper');
    this.gameInitData = {
      userToken: this.userToken,
      windowWidth: canvasWrapper.clientWidth,
      windowHeight: canvasWrapper.clientHeight,
      widthCellCount: payload.scene_size.X,
      heightCellCount: payload.scene_size.Y,
    };

    this.startGame();
  }

  setGameParams() {
    if (!this.gameParams) {
      this.gameParams = {
        mode: 'CLASSIC',
        type: 'SINGLPLAYER',
      };
    }

    if (this.gameParams.mode === GAME_MODE.MULTIPLAYER) {
      this.sendAddToRoom();
      return;
    }

    this.gameParams.onLine = navigator.onLine;

    const [canvasWrapper] = this.wrapper.getElementsByClassName('canvas-wrapper');
    this.gameInitData = {
      snakeText: 'qwertyuiopqe',
      DOMRect: {
        x: 10,
        y: 10,
        width: 15,
        height: 15,
      },
      userToken: this.userToken,
      windowWidth: canvasWrapper.clientWidth,
      windowHeight: canvasWrapper.clientHeight,
      widthCellCount: 60,
      heightCellCount: 40,
    };

    this.startGame();
  }

  startGame() {
    console.log('game init data', this.gameInitData);
    const [canvas] = this.wrapper.getElementsByClassName('snakegame-canvas');
    this.game = new Game(this.gameParams, canvas, this.gameInitData);
    this.game.start();
  }

  hide() {
    super.hide();
  }
}
