import BaseMenu from '../base_menu/base_menu';

import MainMenuTemplate from './hotkeys.pug';
import style from './hotkeys.css';

const buttons = {
  BACK: {
    href: '/snake',
  },
};

const hotkeys = [
  {
    key: 't',
    info: 'Change theme',
  },
  {
    key: 'q',
    info: 'Quit the game',
  },
  {
    key: 'Backspase',
    info: 'Go back',
  },
];

export default class Hotkeys extends BaseMenu {
  constructor(parent) {
    super(MainMenuTemplate, parent, ['hotkeyspage'], false, 'hotkeysmenu');
    this.render();
    this.goBack = this.goBack.bind(this);
    this.noRender = true;
  }

  goBack() {
    super.goBack('/snake');
  }

  pause() {
    super.pause();
  }

  render() {
    super.render({ buttons, hotkeys });
  }
}
