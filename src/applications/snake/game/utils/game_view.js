import Game from '../game';
import GAME_MODE from '../core/modes';
// import FullScreen from './fullScreen';

import SnakeGameTemplate from '../templates/snakegame.pug';
import '../../static/images/home.svg';
import config from '../../modules/view_config';


import Element from '../../../element';

export default class GameView extends Element {
  constructor(parent) {
    super(SnakeGameTemplate, parent, false, ['snakegame-container']);
    this.parent = parent;
  }

  show() {
    // FullScreen.set();
    super.show();
    this.setGameParams();
  }

  render(gameParams) {
    this.gameParams = gameParams;
    const renderParams = {
      mainScoreCollor: config.mainScoreCollor,
      gameCanvasBorder: config.gameCanvasBorder,
      gameBoardBorder: config.gameBoardBorder,
    };
    super.render(renderParams);
  }

  setMultiplayerEnviroment() {
    [this.snakegameContainer] = document.getElementsByClassName('snakegame-container');
    this.snakegameContainer.classList.add('snakegame-container__multiplayer');

    [this.game_mode] = this.parent.getElementsByClassName('game_mode');
    this.game_mode.innerHTML = 'MULTIPLAYER';

    [this.main_score] = this.parent.getElementsByClassName('main-score');
    this.main_score.classList.add('main-score_miltiplayer');

    [this.gameBoard] = document.getElementsByClassName('game-board-wrapper');
    this.gameBoard.hidden = false;
  }

  setArcadeEnvironmemnt() {
    [this.game_mode] = this.parent.getElementsByClassName('game_mode');
    this.game_mode.innerHTML = 'ARCADE';
  }


  removeMultiplayerEnvironment() {
    this.snakegameContainer.classList.remove('snakegame-container__multiplayer');
    this.gameBoard.hidden = true;
    this.main_score.classList.remove('main-score_miltiplayer');
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
    } else if (this.gameParams.mode === GAME_MODE.ARCADE) {
      this.setArcadeEnvironmemnt();
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
    const [canvas] = this.wrapper.getElementsByClassName('snakegame-canvas');
    this.game = new Game(this.gameParams, canvas, this.gameInitData);
  }

  hide() {
    super.hide();
    if (this.gameParams.mode === GAME_MODE.MULTIPLAYER) {
      this.removeMultiplayerEnvironment();
    }
    if (this.game) {
      this.game.destroy();
    }
  }
}
