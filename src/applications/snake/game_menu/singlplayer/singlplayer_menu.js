import BaseMenu from '../base_menu/base_menu';
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
    href: '/snake',
  },
};

export default class SinglplayerMenu extends BaseMenu {
  constructor(parent) {
    super(SinglplayerTemplate, parent, ['snakepage-singlplayer'], false, 'snakemenu-singlplayer');
    this.render();
  }

  show() {
    super.show();
  }

  hide() {
    super.hide();
  }

  render() {
    super.render({ buttons });
  }

  goBack() {
    super.goBack('/snake');
  }
}
