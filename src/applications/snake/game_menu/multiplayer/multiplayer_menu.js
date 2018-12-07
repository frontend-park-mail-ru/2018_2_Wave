import BaseMenu from '../utils/base_menu';
import MultiplayerTemplate from './multiplayer.pug';

import GAME_MODE from '../../game/core/modes';

const buttons = {
  SCENE: {
    href: '/game',
    params: `mode=${GAME_MODE.SCENE}&type=${GAME_MODE.MULTIPLAYER}`,
  },
  'CREATE ROOM': {
    href: '/create_room',
    // params: `mode=${GAME_MODE.ARCADE}&type=${GAME_MODE.SINGLPLAYER}`,
  },
  'ROOMS LIST': {
    href: '/rooms_list',
  },
  BACK: {
    href: '/mainmenu',
  },
};

export default class MultiplayerMenu extends BaseMenu {
  constructor(parent) {
    super(MultiplayerTemplate, parent, 'multiplayer-menu');
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
