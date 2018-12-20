import GAME_MODE from './core/modes';
import OfflineGame from './core/offline/offline';
import OnlineGame from './core/multiplayer/online';
import ArcadeGame from './core/arcade/arcadeMode';
import GameScene from './core/gameScene';
import Size from './models/size';
import WaitingPlayers from './core/multiplayer/waitingPlayers';
import busController from '../modules/busController';
import config from './utils/game_config';
import ErrorMessage from '../error_message/errorMessage';

import './game.pcss';
import '../static/images/home.svg';
import '../static/images/arrow.png';
import WsPostman from '../modules/wsPostman';

let GameConstructor;
export default class Game {
  constructor(gameInfo, canvas, gameInitData) {
    this.gameInitData = gameInitData;
    this.gameInfo = gameInfo;
    this.canvas = canvas;
    this.wsPostman = new WsPostman();
    this.errorMessage = new ErrorMessage();
    this.busController = busController;
    this.countGameParams();
    this.close = this.close.bind(this);
    this.busController.setBusListeners({ Backspace: this.close });

    switch (gameInfo.mode) {
      case GAME_MODE.CLASSIC: {
        if (gameInfo.type === GAME_MODE.SINGLPLAYER) {
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
        if (!this.wsPostman.isReady()) {
          this.errorMessage.setErrorMessage('You are offline');
          this.busController.emit('link', '/snake');
          return;
        }
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
    this.gameScene = new GameScene(
      this.canvas,
      this.windowSize,
      this.cellSize,
      this.gameInitData.orientation,
    );
    this.gameCore = new GameConstructor(this.gameScene, this.gameInitData);
  }

  close() {
    this.busController.emit('link', '/snake');
  }

  countGameParams() {
    let cellWidth;
    if (this.gameInitData.windowWidth > this.gameInitData.windowHeight) {
      cellWidth = Math.floor(
        Math.min(
          this.gameInitData.windowWidth / this.gameInitData.widthCellCount,
          this.gameInitData.windowHeight / this.gameInitData.heightCellCount,
        ),
      );
      this.gameInitData.orientation = config.HORIZONTAL;
    } else {
      cellWidth = Math.floor(
        Math.min(
          this.gameInitData.windowWidth / this.gameInitData.heightCellCount,
          this.gameInitData.windowHeight / this.gameInitData.widthCellCount,
        ),
      );
      this.gameInitData.orientation = config.VERTICAL;
    }

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

    this.gameInitData.mode = this.gameInfo.mode;
    this.gameInitData.type = this.gameInfo.type;
  }

  start(message) {
    if (this.events) {
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
    busController.removeBusListeners({ Backspace: this.close });
  }
}
