import BaseMenu from '../base_menu/base_menu';

import MainMenuTemplate from './main_menu.pug';
import style from './main_menu.pcss';

const buttons = {
  '/singlplayer': 'Singlplayer',
  '/multiplayer': 'Multiplayer',
  '/hotkeys': 'Hot keys',
  '/terminal': 'exit',
};

export default class MainMenuView extends BaseMenu {
  constructor(parent) {
    super(MainMenuTemplate, parent, ['snakepage-main'], false, 'snakemenu-main');
    this.render();
    this.goBack = this.goBack.bind(this);
    this.noRender = true;
  }

  goBack() {
    super.goBack('/terminal');
  }

  pause() {
    super.pause();
  }

  render() {
    super.render({ buttons });
  }
}
