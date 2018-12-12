import SnakeGameView from './game/utils/game_view';
import GameEnv from './views/game_env';

import WsPostman from './modules/wsPostman';
import WsMessageParser from './modules/wsMessageParser';
import WebSocket from '../../modules/webSocket';
import keyboardController from './modules/keyboardController';
import StyleChanger from './modules/style_changer';

import BaseApp from '../base_app';

import MainMenuView from './game_menu/main_menu/main_menu_view';
import SinglplayerView from './game_menu/singlplayer/singlplayer_menu';
import MultiplayerMenu from './game_menu/multiplayer/multiplayer_menu';

import globalUser from './globalUser';

import ErrorMessage from './error_message/errorMessage';

import './style.css';

export default class GameApp extends BaseApp {
  constructor(appUrl, parent) {
    const env = new GameEnv(parent);
    const Views = {
      game: SnakeGameView,
      // mainmenu: MainMenuView,
      singlplayer: SinglplayerView,
      multiplayer: MultiplayerMenu,
    };

    super(appUrl, env.getContainer(), MainMenuView, Views);

    this.env = env;
    this.wsMessageParser = new WsMessageParser(this);
    this.wsMessageParser.setModel('user_token', globalUser);
    this.webSocket = new WebSocket(this.wsMessageParser);
    this.wsPostman = new WsPostman(this.webSocket);
    this.errorMessage = new ErrorMessage();
    this.styleChanger = new StyleChanger();

    this.keyboardController = keyboardController;
  }

  start() {
    this.styleChanger.start();
    this.env.show();
    super.start();
    this.webSocket.connect();
    this.keyboardController.start();
  }

  pause() {
    this.styleChanger.stop();
    this.env.hide();
    super.pause();
  }

  resume() {
    this.styleChanger.start();
    this.env.show();
    super.resume();
  }

  stop() {
    this.styleChanger.stop();
    this.webSocket.close();
  }
}
