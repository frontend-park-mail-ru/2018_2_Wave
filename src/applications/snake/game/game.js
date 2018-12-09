import GAME_MODE from './core/modes';
import OfflineGame from './core/offline/offline';
import OnlineGame from './core/online';
import ArcadeGame from './core/arcadeMode';
import GameScene from './core/gameScene';
import Size from './models/size';


export default class Game {
  constructor(gameInfo, canvas, gameInitData) {
    let GameConstructor = null;
    switch (gameInfo.mode) {
      case GAME_MODE.CLASSIC: {
        if (gameInfo.type === GAME_MODE.SINGLPLAYER) {
          // GameConstructor = OnlineGame;
          GameConstructor = OfflineGame;
        } else {
          GameConstructor = OfflineGame;
        }
        break;
      }

      case GAME_MODE.ARCADE: {
        GameConstructor = ArcadeGame;
        break;
      }

      case GAME_MODE.MULTIPLAYER: {
        GameConstructor = OnlineGame;
        break;
      }
      default:
        throw new Error(`Invalid game mode ${gameInfo.mode}`);
    }

    const cellWidth = Math.floor(Math.min(gameInitData.windowWidth / gameInitData.widthCellCount,
      gameInitData.windowHeight / gameInitData.heightCellCount));

    // реальные размеры одной ячейки
    this.cellSize = new Size(cellWidth, cellWidth);

    const windowWidth = cellWidth * gameInitData.widthCellCount;
    const windowHeight = cellWidth * gameInitData.heightCellCount;

    // реальные размеры окна для игры
    this.windowSize = new Size(windowWidth, windowHeight);

    // размерность поля игры
    gameInitData.cellCount = new Size(gameInitData.widthCellCount,
      gameInitData.heightCellCount);

    console.log('this.cellSize', this.cellSize);
    console.log('this.windowSize', this.windowSize);
    console.log('gameInitData.cellCount', gameInitData.cellCount);

    this.gameScene = new GameScene(canvas, this.windowSize, this.cellSize);
    this.gameCore = new GameConstructor(this.gameScene, gameInitData);
  }

  initGame() {
    
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
