import BaseMenu from '../utils/base_menu';
import busController from '../../modules/busController';

import MultiplayerTemplate from './multiplayer.pug';

export default class MultiplayerMenu extends BaseMenu {
  constructor(parent, appUrl) {
    super(parent, MultiplayerTemplate, 'multiplayer-menu');
    super.render();
    this.setBusListener();
  }

  setBusListener() {
    busController.setBusListeners({ MENU_SINGLPLAYER: this.start.bind(this) });
  }

  removeBusListeners() {
    busController.setBusListeners({ SINGLPLAYER: this.start.bind(this) });
  }

  start() {
    super.show();
    super.start();
  }

  stop() {
    this.removeBusListeners();
    super.stop();
  }
}
