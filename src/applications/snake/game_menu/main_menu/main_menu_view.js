import BaseMenu from '../base_menu/base_menu';

import MainMenuTemplate from './main_menu.pug';
import style from './main_menu.css';

const buttons = {
  '/singlplayer': 'Singlplayer',
  '/multiplayer': 'Multiplayer',
  '/gsmesettings': 'Settings',
  '/leaderboard': 'Leaderboardium',
  '/terminal': 'exit',
};

export default class MainMenuView extends BaseMenu {
  constructor(parent) {
    super(MainMenuTemplate, parent, 'snakemenu-main',  false);
    this.render();
  }

  start() {
    super.start();
  }

  stop() {
    super.stop();
  }

  show() {
    super.show();
  }

  render() {
    super.render({ buttons });
  }
}
