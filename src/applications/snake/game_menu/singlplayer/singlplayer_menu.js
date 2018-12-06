import BaseMenu from '../utils/base_menu';
import busController from '../../modules/busController';

import GAME_MODE from '../../game/core/modes';

import SinglplayerTemplate from './singlplayer.pug';


const buttons = {
  CLASSIC: {
    href: '/game',
    params: `mode=${GAME_MODE.CLASSIC}&type=${GAME_MODE.SINGLPLAYER}`,
  },
  ARCADE: {
    href: '/game',
    params: `mode=${GAME_MODE.CLASSIC}&type=${GAME_MODE.SINGLPLAYER}`,
  },
  BACK: {
    href: '/mainmenu',
  },
};

export default class SinglplayerMenu extends BaseMenu {
  constructor(parent) {
    super(SinglplayerTemplate, parent, 'singlpayer-menu');
    this.render();
  }

  setBusListener() {
    busController.setBusListeners({ MENU_SINGLPLAYER: this.start.bind(this) });
  }

  removeBusListeners() {
    busController.setBusListeners({ SINGLPLAYER: this.start.bind(this) });
  }

  start() {
    this.setBusListener();
    super.start();
  }

  stop() {
    this.removeBusListeners();
    super.stop();
  }

  show() {
    super.show();
  }

  render() {
    super.render({ buttons });
  }
}
