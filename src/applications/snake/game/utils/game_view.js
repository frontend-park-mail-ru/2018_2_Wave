import Game from '../game';
import GAME_MODE from '../core/modes';
import FullScreen from './fullScreen';

import SnakeGameTemplate from '../templates/snakegame.pug';

import Element from '../../../element';

export default class GameView extends Element {
  constructor(parent) {
    super(SnakeGameTemplate, parent, false, ['snakegame-container']);
    this.parent = parent;
  }

  show() {
    FullScreen.set();
    super.show();
    this.setGameParams();
  }

  render(gameParams) {
    this.gameParams = gameParams;
    super.render();
  }

  setMultiplayerEnviroment() {
    [this.snakegameContainer] = document.getElementsByClassName('snakegame-container');
    this.snakegameContainer.classList.add('snakegame-container__multiplayer');

    [this.game_mode] = this.parent.getElementsByClassName('game_mode');
    this.game_mode.innerHTML = 'MULTIPLAYER';

    [this.gameBoard] = document.getElementsByClassName('game-board-wrapper');
    this.gameBoard.hidden = false;
  }


  removeMultiplayerEnviroment() {
    this.snakegameContainer.classList.remove('snakegame-container__multiplayer');
    this.gameBoard.hidden = true;
  }

  setSinglplayerEnviroment() {
    [this.game_mode] = this.parent.getElementsByClassName('game_mode');
    this.game_mode.innerHTML = 'SINGLPLAYER';
  }

  setGameParams() {
    if (!this.gameParams) {
      this.gameParams = {
        mode: 'CLASSIC',
        type: 'SINGLPLAYER',
      };
    }

    if (this.gameParams.mode === GAME_MODE.MULTIPLAYER) {
      this.setMultiplayerEnviroment();
    } else {
      this.setSinglplayerEnviroment();
    }

    this.gameParams.onLine = navigator.onLine;
    const [canvasWrapper] = this.wrapper.getElementsByClassName('canvas-wrapper');
    this.gameInitData = {
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
