import GAME_MODES from './core/modes';
import OfflineGame from './core/offline';
import OnlineGame from './core/online';
import ArcadeGame from './core/arcadeMode';
import GameScene from './core/gameScene';
import keyboardController from '../modules/keyboardController';
import Size from './models/size';


export default class Game {
  constructor(mode, canvas, gameInitData) {
    let GameConstructor = null;

    // change mode
    mode = GAME_MODES.ARCADE;
    // mode = GAME_MODES.ONLINE;
    // mode = GAME_MODES.OFFLINE;

    switch (mode) {
      case GAME_MODES.ONLINE: {
        // GameConstructor = OnlineGame;
        GameConstructor = OfflineGame;
        break;
      }
      case GAME_MODES.OFFLINE: {
        GameConstructor = OfflineGame;
        // GameConstructor = OnlineGame;
        break;
      }
      case GAME_MODES.ARCADE: {
        GameConstructor = ArcadeGame;
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

    this.gameScene = new GameScene(canvas, this.windowSize, this.cellSize);
    this.keyboardController = keyboardController;
    this.gameCore = new GameConstructor(this.keyboardController, this.gameScene, gameInitData);
  }

  start() {
    this.gameCore.start();
  }

  pause() {
    this.gameCore.pause();
  }

  resume() {
    this.gameCore.resume();
  }

  destroy() {
    this.gameCore.destroy();
  }
}