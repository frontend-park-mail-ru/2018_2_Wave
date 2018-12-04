import BaseMenu from '../utils/base_menu';

import MainMenuTemplate from './main_menu.pug';

export default class MainMenuView extends BaseMenu {
  constructor(parent, appUrl) {
    const focusClass = 'snakemenu-button_focus';
    super(parent, focusClass, MainMenuTemplate);
    super.render();
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
}
