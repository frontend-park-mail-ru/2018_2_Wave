import BaseMenu from '../utils/base_menu';

import MainMenuTemplate from './main_menu.pug';

export default class MainMenuView extends BaseMenu {
  constructor(parent, appUrl) {
    super(parent, MainMenuTemplate, 'main-menu');
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
