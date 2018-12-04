// import BaseApp from '../../base_app';

import MainMenuView from './main_menu/main_menu_view';
import SinglplayerView from './singlplayer/singlplayer_menu';

import MenuEnv from './menu_env';

import AppElement from '../../base_app_element';

export default class MenuApp extends AppElement {
  constructor(parent, appUrl) {
    const env = new MenuEnv(parent);
    const Views = {
      singlplayer: SinglplayerView,
      // multiplayer: MultiplayerView,
      // leaderboard: LeaderboardView,
      // settings: SettingsView,
      // profile: ProfileView,
    };

    super(appUrl, env.getContainer(), MainMenuView, Views);
  }

  start() {
    super.start();
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
}
