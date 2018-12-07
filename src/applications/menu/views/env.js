import Element from '../../element';
// import UserBlock from '../components/userblock';


import template from '../templates/main.pug';

import '../styles/main.pcss';
import '../styles/tile.pcss';
import '../styles/caroosel.pcss';
import '../styles/content.pcss';
import '../styles/header.pcss';
import '../styles/menu.pcss';
import '../styles/rename.pcss';
import '../styles/tile-panel.pcss';

import '../../../../static/fonts/Gilroy-ExtraBold.otf';
import '../../../../static/fonts/Gilroy-Light.otf';

import '../../../../static/img/triss.jpg';
import '../../../../static/img/terminal.jpg';

export default class Enviroment extends Element {
  constructor(parent) {
    super(template, parent);
    super.render();
    // const [userblockPlace] = this.wrapper.getElementsByClassName('header');
    // this.userblock = new UserBlock(userblockPlace);
  }

  getContainer() {
    [this.content] = this.wrapper.getElementsByClassName('content');
    return this.content;
  }

  show() {
    super.show();
    // this.userblock.show();
  }

  async render() {
    // this.userblock.render();
  }
}
