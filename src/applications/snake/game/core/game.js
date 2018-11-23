import GAME_MODES from './modes';
import OfflineGame from './offline';
import OnlineGame from './online';
import GameScene from './gameScene';
import keyboardController from '../modules/keyboardController';
import Size from '../model/size';


export default class Game {
  constructor(mode, root, gameInitData) {
    let GameConstructor = null;
    switch (mode) {
      case GAME_MODES.ONLINE: {
        GameConstructor = OnlineGame;
        break;
      }
      case GAME_MODES.OFFLINE: {
        // GameConstructor = OfflineGame;
        GameConstructor = OnlineGame;
        break;
      }
      default:
        throw new Error(`Invalid game mode ${mode}`);
    }

    const cellWidth = gameInitData.DOMRect.width;
    const cellHeight = gameInitData.DOMRect.height;

    // реальные размеры одной ячейки
    this.cellSize = new Size(cellWidth, cellHeight);

    const { windowWidth } = gameInitData;
    const { windowHeight } = gameInitData;

    // реальные размеры окна для игры
    this.windowSize = new Size(windowWidth, windowHeight);

    const widthCellCount = Math.floor(windowWidth / cellWidth);
    const heightCellCount = Math.floor(windowHeight / cellHeight);

    // размерность поля игры
    gameInitData.cellCount = new Size(widthCellCount, heightCellCount);

    console.log('this.cellSize', this.cellSize);
    console.log('this.windowSize', this.windowSize);
    console.log('gameInitData.cellCount', gameInitData.cellCount);

    this.gameScene = new GameScene(root, this.windowSize, this.cellSize);
    this.keyboardController = keyboardController;
    this.gameCore = new GameConstructor(this.keyboardController, this.gameScene, gameInitData);
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
