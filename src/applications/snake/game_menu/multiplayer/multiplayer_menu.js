import BaseMenu from '../base_menu/base_menu';
import MultiplayerTemplate from './multiplayer.pug';

import GAME_MODE from '../../game/core/modes';

const buttons = {
  '2 PLAYERS': {
    href: '/game',
    params: `mode=${GAME_MODE.MULTIPLAYER}&type=${GAME_MODE.TWO_PLAYERS}`,
  },
  '3 PLAYERS': {
    href: '/game',
    params: `mode=${GAME_MODE.MULTIPLAYER}&type=${GAME_MODE.THREE_PLAYERS}`,
  },
  '4 PLAYERS': {
    href: '/game',
    params: `mode=${GAME_MODE.MULTIPLAYER}&type=${GAME_MODE.FOUR_PLAYERS}`,
  },
  BACK: {
    href: '/snake',
  },
};

export default class MultiplayerMenu extends BaseMenu {
  constructor(parent) {
    // super(MultiplayerTemplate, parent, ['snakemenu__purple-border', 'snakemenu-multiplayer']);
    super(MultiplayerTemplate, parent, ['snakepage-multiplayer'], false, 'snakemenu-multiplayer');
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
