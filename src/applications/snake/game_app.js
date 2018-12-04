import GAME_MODES from './game/core/modes';

import AppElement from '../base_app_element';
// import BaseApp from '../base_app';

// import GameView from './views/game_field';
import SnakeGameView from './game/utils/game_view';
import GameEnv from './views/game_env';

import WsMessage from './modules/wsMessage';
import WsMessageParser from './modules/wsMessageParser';
import WebSocket from '../../modules/webSocket';
import busController from './modules/busController';
import keyboardController from './modules/keyboardController';

import MenuView from './game_menu/menu_view';

import './style.css';


export default class GameApp extends AppElement {
  constructor(appUrl, parent) {
    const env = new GameEnv(parent);
    const Views = {
      game: SnakeGameView,
    };

    super(appUrl, env.getContainer(), MenuView, Views);

    this.wsMessageParser = new WsMessageParser(this);
    this.webSocket = new WebSocket(this.wsMessageParser);
    this.wsMessage = new WsMessage(this.webSocket);
    this.keyboardController = keyboardController;
    // this.gameMenu = new GameMenu('?????????????');

    // this.gameContainer = this.views.main.getCanvas();
  }


  start() {
    super.start();
    // super.show();
    // this.webSocket.connect();
    this.keyboardController.start();
    // this.gameMenu.start();
    // menu return game mode
    // this.initGame(gameMode);

    // this.initGame();
  }

  pause() {
    super.pause();
    // this.game.pause();
  }

  resume() {
    super.resume();
  }


  stop() {
    this.webSocket.close();
    this.game.destroy();
  }


  // initGame() {
  //   this.gameInitData = {
  //     snakeText: 'qwertyuiopqe',
  //     DOMRect: {
  //       x: 10,
  //       y: 10,
  //       width: 18,
  //       height: 18,
  //     },
  //     // windowWidth: window.innerWidth,
  //     // windowHeight: window.innerHeight,
  //     windowWidth: 800,
  //     windowHeight: 500,
  //   };


  //   // if (navigator.onLine) {
  //     if (true) {
  //     this.mode = GAME_MODES.ONLINE;
  //     this.wsMessage.addToRoom();
  //     this.startGame = this.startGame.bind(this);
  //     busController.setBusListeners({ STATUS_OK: this.startGame });
  //     busController.setBusListeners({ data: this.setUserToken.bind(this) });
  //   } else {
  //     this.mode = GAME_MODES.OFFLINE;
  //     this.game = new Game(this.mode, this.gameContainer, this.gameInitData);
  //     // TODO: FIXME: call this in view after button press!
  //     this.game.start();
  //   }

  //   // this.game = new Game(mode, this.gameContainer, gameInitData);
  // }

  // setUserToken(userToken) {
  //   console.log('set user token', userToken);
  //   this.userToken = userToken;
  // }


  // startGame() {
  //   this.gameInitData = {};
  //   busController.removeBusListeners({ data: this.startGame });
  //   this.wsMessage.startGame();
  //   this.statusTick = this.statusTick.bind(this);
  //   busController.setBusListeners({ STATUS_TICK: this.statusTick });
  // }

  // statusTick(payload) {
  //   busController.removeBusListeners({ STATUS_TICK: this.statusTick });
  //   this.gameInitData.payload = payload;
  //   this.gameInitData = {
  //     snakeText: 'qwertyuiopqe',
  //     DOMRect: {
  //       x: 10,
  //       y: 10,
  //       width: 6,
  //       height: 6,
  //     },
  //     userToken: this.userToken,
  //     windowWidth: payload.scene_size.X * 6,
  //     windowHeight: payload.scene_size.Y * 6,
  //   };

  //   this.game = new Game(this.mode, this.gameContainer, this.gameInitData);
  //   this.game.start();
  // }

  // handleWsMessage(data) {

  // }
}
