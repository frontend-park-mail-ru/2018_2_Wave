import BaseMenu from '../base_menu/base_menu';

import MainMenuTemplate from './main_menu.pug';
import './main_menu.pcss';

import ErrorMesage from '../../error_message/errorMessage';
import globalUser from '../../globalUser';
import busController from '../../modules/busController';

const buttons = {
  '/singleplayer': 'Singleplayer',
  '/multiplayer': 'Multiplayer',
  '/hotkeys': 'Hot keys',
  '/terminal': 'exit',
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
      const isloginUser = globalUser.isLoginUser();
      console.log('islogin', isloginUser);
      if (!isloginUser) {
        console.log('nologin');
        [this.multiplayerButton] = document.getElementsByClassName('multiplayermenu-button');
        if (this.multiplayerButton) {
          this.multiplayerButton.setAttribute('href', '/snake');
          this.multiplayerButton.setAttribute('src', '/snake');
          this.multiplayerButton.setAttribute('error', 'Register to play in multiplayer');
          this.multiplayerButton.addEventListener('click', this.unauthorizedMessage);
          this.multiplayerButton.removeEventListener('touchstart', this.unauthorizedMessage, { passive: false });
        }
      } else if (this.multiplayerButton) {
        this.multiplayerButton.setAttribute('href', '/multiplayer');
        this.multiplayerButton.setAttribute('src', '/multiplayer');
      }
    }
  }

  unauthorizedMessage(e) {
    e.stopPropagation();
    e.preventDefault();

    const isloginUser = globalUser.isLoginUser();
    if (isloginUser) {
      this.busController.emit('link', '/multiplayer');
    } else {
      this.errorMessage.setErrorMessage('Register to play in multiplayer');
    }
    this.multiplayerButton.removeEventListener('click', this.unauthorizedMessage);
    this.multiplayerButton.removeEventListener('touchstart', this.unauthorizedMessage, { passive: false });
  }

  pause() {
    super.pause();
  }

  render() {
    super.render({ buttons });
  }

  hide() {
    if (this.multiplayerButton) {
      this.multiplayerButton.removeEventListener('click', this.unauthorizedMessage);
      this.multiplayerButton.removeEventListener('touchstart', this.unauthorizedMessage);
    }
    super.hide();
  }
}
