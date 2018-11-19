import GAME_MODES from './modes';
import OfflineGame from './core/offline';
import OnlineGame from './core/online';
import GameScene from './core/gameScene';
import keyboardController from '../modules/keyboardController';


export default class Game {
  constructor(mode, canvas) {
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

    this.gameScene = new GameScene(canvas);

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
