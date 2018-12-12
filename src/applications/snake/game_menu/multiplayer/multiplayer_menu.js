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
    super(MultiplayerTemplate, parent, ['snakemenu__purple-border', 'snakemenu-multiplayer']);
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
