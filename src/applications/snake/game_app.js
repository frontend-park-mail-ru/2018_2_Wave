import GAME_MODES from './game/core/modes';

import BaseApp from '../base_app';

import GameEnv from './views/env';
import GameView from './views/game_field';
import Game from './game/game';

import WsMessage from './modules/wsMessage';
import wsMessageParser from './modules/wsMessageParser';
import WebSocket from '../../modules/webSocket';
import busController from './modules/busController';

import './style.css';


export default class SnakeApp extends BaseApp {
  constructor(appUrl, parent) {
    const env = new GameEnv(parent);
    super(appUrl, env.getContainer(), GameView);
    this.webSocket = new WebSocket(wsMessageParser);
    this.wsMessage = new WsMessage(this.webSocket);


    this.env = env;
    this.gameContainer = this.views.main.getCanvas();
  }


  start() {
    this.env.show();
    super.start();
    this.webSocket.connect();
    // menu.start();
    // menu return game mode
    // this.initGame(gameMode);

    this.initGame();
  }

  pause() {
    this.env.hide();
    super.pause();
    this.game.pause();
  }

  resume() {
    this.env.show();
    super.resume();
  }


  stop() {
    this.webSocket.close();
    this.game.destroy();
  }


  initGame() {
    
    this.gameInitData = {
      snakeText: 'qwertyuiopqe',
      DOMRect: {
        x: 10,
        y: 10,
        width: 18,
        height: 18,
      },
      // windowWidth: window.innerWidth,
      // windowHeight: window.innerHeight,
      windowWidth: 800,
      windowHeight: 500,
    };

    if (navigator.onLine) {
      this.mode = GAME_MODES.ONLINE;
      this.wsMessage.addToRoom();
      this.startGame = this.startGame.bind(this);
      busController.setBusListeners({ STATUS_OK: this.startGame });
      busController.setBusListeners({ data: this.setUserId.bind(this) });
    } else {
      this.mode = GAME_MODES.OFFLINE;
      this.game = new Game(this.mode, this.gameContainer, this.gameInitData);
      // TODO: FIXME: call this in view after button press!
      this.game.start();
    }

    // this.game = new Game(mode, this.gameContainer, gameInitData);
  }


  startGame() {
    this.gameInitData = {};
    busController.removeBusListeners({ data: this.startGame });
    wsMessage.startGame();
    this.statusTick = this.statusTick.bind(this);
    busController.setBusListeners({ STATUS_TICK: this.statusTick });
  }

  statusTick(payload) {
    busController.removeBusListeners({ STATUS_TICK: this.statusTick });
    this.gameInitData.payload = payload;
    this.gameInitData = {
      snakeText: 'qwertyuiopqe',
      DOMRect: {
        x: 10,
        y: 10,
        width: 6,
        height: 6,
      },
      userId: this.userId,
      windowWidth: payload.scene_size.X * 6,
      windowHeight: payload.scene_size.Y * 6,
    };

    this.game = new Game(this.mode, this.gameContainer, this.gameInitData);
    this.game.start();
  }

  handleWsMessage(data) {

  }
}
