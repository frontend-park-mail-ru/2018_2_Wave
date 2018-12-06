import BaseMenu from '../utils/base_menu';
import busController from '../../modules/busController';

import SinglplayerTemplate from './singlplayer.pug';


const buttons = {
  '/game': {
    text: 'CLASSIC',
    params: 'mode=singlplayer&type=classic',
  },
  '/arcade': {
    text: 'ARCADE',
    params: 'mode=singlplayer&params=classic',
  },
  '/mainmenu': {
    text: 'BACK',
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
