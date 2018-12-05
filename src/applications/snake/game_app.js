import SnakeGameView from './game/utils/game_view';
import GameEnv from './views/game_env';

import WsMessage from './modules/wsMessage';
import WsMessageParser from './modules/wsMessageParser';
import WebSocket from '../../modules/webSocket';
import keyboardController from './modules/keyboardController';

import BaseApp from '../base_app';

import './style.css';
import MainMenuView from './game_menu/main_menu/main_menu_view';
import SinglplayerView from './game_menu/singlplayer/singlplayer_menu';

export default class GameApp extends BaseApp {
  constructor(appUrl, parent) {
    const env = new GameEnv(parent);
    const Views = {
      game: SnakeGameView,
      singlplayer: SinglplayerView,
      mainmenu: MainMenuView,
    };

    super(appUrl, env.getContainer(), MainMenuView, Views);

    this.env = env;
    this.wsMessageParser = new WsMessageParser(this);
    this.webSocket = new WebSocket(this.wsMessageParser);
    this.wsMessage = new WsMessage(this.webSocket);
    this.keyboardController = keyboardController;
  }

  start() {
    this.env.show();
    super.start();
    this.webSocket.connect();
    this.keyboardController.start();
  }

  pause() {
    this.env.hide();
    super.pause();
  }

  resume() {
    this.env.show();
    super.resume();
  }

  stop() {
    this.webSocket.close();
  }

  setUserToken(userToken) {
    console.log('set user token', userToken);
    this.userToken = userToken;
  }
}
