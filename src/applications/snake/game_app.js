import GAME_MODES from './game/core/modes';


import BaseApp from '../base_app';

import GameEnv from './views/env';
import GameView from './views/game_field';
import Game from './game/game';

import webSocket from './modules/webSocket';
import wsRouter from '../../modules/wsRouter';
import wsMessageParser from './modules/wsMessageParser';
import busController from './modules/busController';

import './style.css';


export default class SnakeApp extends BaseApp {
  constructor(appUrl, parent) {
    wsRouter.addMessageParser('snake_game', wsMessageParser);

    const env = new GameEnv(parent);
    super(appUrl, env.getContainer(), GameView);

    this.env = env;
    this.gameContainer = this.views.main.getCanvas();
  }


  start() {
    this.env.show();
    super.start();

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
    this.game.destroy();
  }


  initGame() {

    /*
    this.send({
      room_id: 'app',
      signal: 'add_to_room',
      payload: {
        room_id: 'snake',
      },
    });

    setTimeout(() => {
      this.send({
        room_id: 'snake',
        signal: 'game_play',
      });
    }, 1000);
    */

    let gameInitData = {
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
      webSocket.addToRoom();
      this.startGame = this.startGame.bind(this);
      busController.setBusListeners({ data: this.startGame });
    } else {
      this.mode = GAME_MODES.OFFLINE;
      this.game = new Game(this.mode, this.gameContainer, gameInitData);
      // TODO: FIXME: call this in view after button press!
      this.game.start();
    }

    // this.game = new Game(mode, this.gameContainer, gameInitData);
  }

  startGame(userId) {
    this.gameInitData = {};
    this.user_id = userId;
    busController.removeBusListeners({ data: this.startGame });
    webSocket.startGame();
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
      user_id: this.user_id,
      windowWidth: payload.scene_size.X * 6,
      windowHeight: payload.scene_size.Y * 6,
    };

    this.game = new Game(this.mode, this.gameContainer, this.gameInitData);
    this.game.start();
  }
}
