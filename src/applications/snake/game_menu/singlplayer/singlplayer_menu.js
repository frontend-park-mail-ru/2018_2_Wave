import BaseMenu from '../utils/base_menu';
import SinglplayerTemplate from './singlplayer.pug';

import GAME_MODE from '../../game/core/modes';

const buttons = {
  CLASSIC: {
    href: '/game',
    params: `mode=${GAME_MODE.CLASSIC}&type=${GAME_MODE.SINGLPLAYER}`,
  },
  ARCADE: {
    href: '/game',
    params: `mode=${GAME_MODE.ARCADE}&type=${GAME_MODE.SINGLPLAYER}`,
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
