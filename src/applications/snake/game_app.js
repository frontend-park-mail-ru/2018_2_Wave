import AppElement from '../base_app_element';

import SnakeGameView from './game/utils/game_view';
import GameEnv from './views/game_env';

import WsMessage from './modules/wsMessage';
import WsMessageParser from './modules/wsMessageParser';
import WebSocket from '../../modules/webSocket';
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
  }

  start() {
    super.start();
    super.show();
    this.webSocket.connect();
    this.keyboardController.start();
  }

  pause() {
    super.pause();
  }

  resume() {
    super.resume();
  }

  stop() {
    this.webSocket.close();
    this.game.destroy();
  }

  setUserToken(userToken) {
    console.log('set user token', userToken);
    this.userToken = userToken;
  }
}
