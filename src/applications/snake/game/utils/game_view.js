import busController from '../../modules/busController';
import Game from '../game';
import GAME_MODE from '../core/modes';

import SnakeGameTemplate from '../templates/snakegame.pug';
import WsPostman from '../../modules/wsPostman';

import Element from '../../../element';

export default class GameView extends Element {
  constructor(parent) {
    super(SnakeGameTemplate, parent, ['snakegame-container']);
  }

  show() {
    super.show();
    this.setGameParams();
  }

  render(gameParams) {
    this.gameParams = gameParams;
    super.render();
  }

  startMultiplayer() {
    // busController.removeBusListeners({ STATUS_TICK: this.startMultiplayer });
    this.setMultiplayerEnviroment();
    const [canvasWrapper] = this.wrapper.getElementsByClassName('canvas-wrapper');
    this.gameInitData = {
      userToken: this.userToken,
      windowWidth: canvasWrapper.clientWidth,
      windowHeight: canvasWrapper.clientHeight,
      widthCellCount: 90,
      heightCellCount: 60,
    };

    this.startGame();
  }

  setMultiplayerEnviroment() {
    [this.snakegameContainer] = document.getElementsByClassName('snakegame-container');
    this.snakegameContainer.classList.add('snakegame-container__multiplayer');

    [this.gameBoard] = document.getElementsByClassName('game-board-wrapper');
    this.gameBoard.hidden = false;
  }


  removeMultiplayerEnviroment() {
    this.snakegameContainer.classList.remove('snakegame-container__multiplayer');
    this.gameBoard.hidden = true;
  }

  setGameParams() {
    if (!this.gameParams) {
      this.gameParams = {
        mode: 'CLASSIC',
        type: 'SINGLPLAYER',
      };
    }

    if (this.gameParams.mode === GAME_MODE.MULTIPLAYER) {
      this.startMultiplayer();
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
      widthCellCount: 90,
      heightCellCount: 60,
    };

    this.startGame();
  }

  startGame() {
    console.log('game init data', this.gameInitData);
    const [canvas] = this.wrapper.getElementsByClassName('snakegame-canvas');
    this.game = new Game(this.gameParams, canvas, this.gameInitData);
    // this.game.start();
  }

  hide() {
    super.hide();
    if (this.gameParams.mode === GAME_MODE.MULTIPLAYER) {
      this.removeMultiplayerEnviroment();
    }
    this.game.destroy();
  }
}
