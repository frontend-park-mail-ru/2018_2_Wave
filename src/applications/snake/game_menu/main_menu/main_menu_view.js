import BaseMenu from '../base_menu/base_menu';

import MainMenuTemplate from './main_menu.pug';
import './main_menu.pcss';

import ErrorMesage from '../../error_message/errorMessage';
import globalUser from '../../globalUser';

const buttons = {
  '/singleplayer': 'Singleplayer',
  '/multiplayer': 'Multiplayer',
  '/hotkeys': 'Hot keys',
  '/': 'exit',
};

export default class MainMenuView extends BaseMenu {
  constructor(parent) {
    super(MainMenuTemplate, parent, ['snakepage-main'], false, 'snakemenu-main');
    this.render();
    this.goBack = this.goBack.bind(this);
    this.noRender = true;
    this.errorMessage = new ErrorMesage();
    this.unauthorizedMessage = this.unauthorizedMessage.bind(this);
  }

  goBack() {
    super.goBack('/');
  }

  show() {
    super.show();
    this.setEnvironment();
  }

  async setEnvironment() {
    console.log('checkglobaluser setEnvironment');
    if (globalUser) {
      const isloginUser = await globalUser.isLoginUser();
      if (!isloginUser) {
        console.log('nologin');
        [this.multiplayerButton] = document.getElementsByClassName('multiplayermenu-button');
        if (this.multiplayerButton) {
          this.multiplayerButton.setAttribute('href', '/snake');
          this.multiplayerButton.setAttribute('src', '/snake');
          this.multiplayerButton.setAttribute('error', 'Register to play in multiplayer');
          this.multiplayerButton.addEventListener('click', this.unauthorizedMessage);
        }
      }
    }
  }

  unauthorizedMessage() {
    this.errorMessage.setErrorMessage('Register to play in multiplayer');
  }

  pause() {
    super.pause();
  }

  async render() {
    console.log('checkglobaluser render');
    if (globalUser) {
      console.log('checkglobaluser in');
      const isloginUser = await globalUser.isLoginUser();
      super.render({ buttons, loggedIn: isloginUser });
    } else {
      console.log('checkglobaluser else');
      super.render({ buttons, loggedIn: false });
    }
    console.log('checkglobaluser out');
  }

  hide() {
    if (this.multiplayerButton) {
      this.multiplayerButton.removeEventListener('click', this.unauthorizedMessage);
    }
    super.hide();
  }
}
