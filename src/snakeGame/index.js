import GAME_MODES from './modes';
import OfflineGame from './core/offline';
import OnlineGame from './core/online';
import GameScene from './core/gameScene';
import keyboardController from '../modules/keyboardController';

import Size from './model/size';


export default class Game {
  constructor(mode, gameInitData) {
    let GameConstructor = null;
    switch (mode) {
      case GAME_MODES.ONLINE: {
        GameConstructor = OnlineGame;
        break;
      }
      case GAME_MODES.OFFLINE: {
        GameConstructor = OfflineGame;
        break;
      }
      default:
        throw new Error(`Invalid game mode ${mode}`);
    }

    /*
    const gameInitData = {
      snakeText: ,
      DOMRect,
      widthWidth,
      windowHeight,
    }
    */

    const cellWidth = gameInitData.DOMRect.width / (this.snakeText.length - ' snake'.length);
    const cellHeight = gameInitData.DOMRect.height;

    // реальные размеры одной ячейки
    this.cellSize = new Size(cellWidth, cellHeight);

    const [windowWidth] = gameInitData;
    const [windowHeight] = gameInitData;

    // реальные размеры окна для игры
    this.windowSize = new Size(windowWidth, windowHeight);

    const widthCellCount = Math.floor(windowWidth / cellWidth);
    const heightCellCount = Math.floor(windowHeight / cellHeight);

    // размерность поля игры
    this.cellCount = new Size(widthCellCount, heightCellCount);


    this.gameScene = new GameScene(this.windowSize, this.cellSize);
    this.keyboardController = keyboardController;
    this.gameCore = new GameConstructor(this.keyboardController, this.gameScene);
  }

  start() {
    this.keyboardController.start();
    this.gameCore.start();
  }

  destroy() {
    this.keyboardController.stop();
    this.gameCore.destroy();
  }
}
