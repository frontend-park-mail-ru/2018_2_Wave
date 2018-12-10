import './env.pcss';

import Element from '../../../element';
import UserBlock from '../../components/userblock/userblock';
import Menu from '../../components/menu/menu';

import template from './env.pug';

import '../../../../../static/fonts/Gilroy-ExtraBold.otf';
import '../../../../../static/fonts/Gilroy-Light.otf';


export default class Enviroment extends Element {
  constructor(parent) {
    super(template, parent);
    super.render();

    [this.contentPlace] = this.wrapper.getElementsByClassName('content');
    [this.title] = this.wrapper.getElementsByClassName('title__text');

    const [userblockPlace] = this.wrapper.getElementsByClassName('userblock');
    const [menuPlace] = this.wrapper.getElementsByClassName('menu');
    this.userblock = new UserBlock(userblockPlace, userblockPlace);
    this.menu = new Menu(menuPlace, menuPlace);
  }

  setTitle(text) {
    this.title.innerHTML = text;
    document.title = text;
  }

  show() {
    super.show();
    this.userblock.show();
    this.menu.show();
  }

  async render() {
    this.userblock.render();
    this.menu.render();
  }
}
