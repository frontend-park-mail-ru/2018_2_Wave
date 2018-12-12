import BaseMenu from '../base_menu/base_menu';
import busController from '../../modules/busController';

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
    super(MainMenuTemplate, parent, ['snakepage-main'], false, 'snakemenu-main');
    this.render();
    this.goBack = this.goBack.bind(this);
    this.noRender = true;
  }

  show() {
    busController.setBusListeners({ Backspace: this.goBack });
    super.show();
  }

  hide() {
    busController.removeBusListeners({ Backspace: this.goBack });
    super.hide();
  }

  goBack() {
    busController.emit('link', '/terminal');
  }

  pause() {
    console.log(pause);
    super.pause();
  }

  render() {
    // if (this.render) return;
    super.render({ buttons });
  }
}
