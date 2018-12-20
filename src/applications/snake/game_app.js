import SnakeGameView from './game/utils/game_view';
import GameEnv from './views/game_env';

import WsPostman from './modules/wsPostman';
import WsMessageParser from './modules/wsMessageParser';
import WebSocket from '../../modules/webSocket';
import keyboardController from './modules/keyboardController';
import styleChanger from './modules/style_changer';

import BaseApp from '../base_app';

import MainMenuView from './game_menu/main_menu/main_menu_view';
import SinglplayerView from './game_menu/singlplayer/singlplayer_menu';
import MultiplayerMenu from './game_menu/multiplayer/multiplayer_menu';
import HotKeys from './game_menu/hotkeys/hotkeys';

import globalUser from './globalUser';

import ErrorMessage from './error_message/errorMessage';

// import './styles/style.pcss';

import './style.pcss';
import './styles/font.pcss';
import '../../../static/fonts/PressStart2P.ttf';

export default class GameApp extends BaseApp {
  constructor(appUrl, parent) {
    const env = new GameEnv(parent);
    const Views = {
      game: SnakeGameView,
      singleplayer: SinglplayerView,
      multiplayer: MultiplayerMenu,
      hotkeys: HotKeys,
    };

    super(appUrl, env.getContainer(), MainMenuView, Views);

    this.env = env;
    this.parent = parent;
    this.wsMessageParser = new WsMessageParser(this);
    this.wsMessageParser.setModel('user_token', globalUser);
    this.webSocket = new WebSocket(this.wsMessageParser);
    this.wsPostman = new WsPostman(this.webSocket);
    this.errorMessage = new ErrorMessage();
    this.styleChanger = styleChanger;

    this.keyboardController = keyboardController;
  }

  start() {
    this.parent.style.background = 'black';
    this.styleChanger.start();
    this.env.show();
    super.start();
    this.webSocket.connect();
    this.keyboardController.start();
  }

  pause() {
    this.styleChanger.stop();
    this.keyboardController.stop();
    this.env.hide();
    super.pause();
  }

  resume() {
    this.parent.style.background = 'black';
    this.keyboardController.start();
    this.styleChanger.start();
    this.env.show();
    super.resume();
  }

  stop() {
    this.keyboardController.stop();
    this.styleChanger.stop();
    this.webSocket.close();
    super.stop();
  }
}
