import BaseMenu from '../utils/base_menu';

import SinglplayerTemplate from './singlplayer.pug';

export default class SinglplayerMenu extends BaseMenu {
  constructor(parent, appUrl) {
    const focusClass = 'snakemenu-button_focus';
    super(parent, focusClass, SinglplayerTemplate);
    super.render();
  }

  start() {
    super.start();
  }

  stop() {
    super.stop();
  }
}
