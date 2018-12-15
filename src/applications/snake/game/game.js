import GAME_MODE from './core/modes';
import OfflineGame from './core/offline/offline';
import OnlineGame from './core/multiplayer/online';
import ArcadeGame from './core/arcadeMode';
import GameScene from './core/gameScene';
import Size from './models/size';
import WaitingPlayers from './core/multiplayer/waitingPlayers';
import busController from '../modules/busController';

import style from './game.css';
import WsPostman from '../modules/wsPostman';

let GameConstructor;
export default class Game {
  constructor(gameInfo, canvas, gameInitData) {
    this.gameInitData = gameInitData;
    this.canvas = canvas;
    this.countGameParams();

    switch (gameInfo.mode) {
      case GAME_MODE.CLASSIC: {
        if (gameInfo.type === GAME_MODE.SINGLPLAYER) {
          // GameConstructor = OnlineGame;
          GameConstructor = OfflineGame;
        } else {
          GameConstructor = OfflineGame;
        }
        this.start();
        break;
      }

      case GAME_MODE.ARCADE: {
        GameConstructor = ArcadeGame;
        this.start();
        break;
      }

      case GAME_MODE.MULTIPLAYER: {
        GameConstructor = OnlineGame;
        this.waitingPlayers = new WaitingPlayers(this.canvas, this.gameInitData, gameInfo);
        this.waitingPlayers.start();
        this.events = { quick_search_done: this.start.bind(this) };
        busController.setBusListeners(this.events);
        break;
      }
      default:
        throw new Error(`Invalid game mode ${gameInfo.mode}`);
    }
  }

  initGame() {
    this.gameScene = new GameScene(this.canvas, this.windowSize, this.cellSize);
    this.gameCore = new GameConstructor(this.gameScene, this.gameInitData);
  }

  countGameParams() {
    const cellWidth = Math.floor(Math.min(this.gameInitData.windowWidth / this.gameInitData.widthCellCount,
      this.gameInitData.windowHeight / this.gameInitData.heightCellCount));

    // реальные размеры одной ячейки
    this.cellSize = new Size(cellWidth, cellWidth);
    this.gameInitData.cellSize = this.cellSize;

    const windowWidth = cellWidth * this.gameInitData.widthCellCount;
    const windowHeight = cellWidth * this.gameInitData.heightCellCount;

    // реальные размеры окна для игры
    this.windowSize = new Size(windowWidth, windowHeight);

    // размерность поля игры
    this.gameInitData.cellCount = new Size(this.gameInitData.widthCellCount,
      this.gameInitData.heightCellCount);
  }

  start(message) {
    console.log('start quick search');
    if (this.events) {
      this.wsPostman = new WsPostman();
      this.wsPostman.setRoomToken(message.payload.room_token);
      busController.removeBusListeners(this.events);
      this.waitingPlayers.stop();
    }
    this.initGame();
    this.gameCore.start();
  }

  pause() {
    this.gameCore.pause();
  }

  resume() {
    this.gameCore.resume();
  }

  destroy() {
    if (this.gameCore) {
      this.gameCore.destroy();
    }
    if (this.waitingPlayers) {
      this.waitingPlayers.stop();
    }
  }
}
