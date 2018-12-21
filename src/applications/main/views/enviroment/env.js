import './env.pcss';

import Element from '../../../element';
import UserBlock from '../../components/userblock/userblock';
import Menu from '../../components/menu/menu';
import IconBlock from '../../components/icon-block/icon-block';

import template from './env.pug';

import '../../../../../static/fonts/Gilroy-ExtraBold.otf';
import '../../../../../static/fonts/Gilroy-Light.otf';


export default class Enviroment extends Element {
  constructor(parent, wrapper) {
    super(template, parent, wrapper || parent);
    super.render();

    [this.title] = this.wrapper.getElementsByClassName('title__text');
    [this.mainContainer] = this.wrapper.getElementsByClassName('grid-common');
    const [userblockPlace] = this.wrapper.getElementsByClassName('userblock');
    const [menuPlace] = this.wrapper.getElementsByClassName('menu');
    const [iconsPlace] = this.wrapper.getElementsByClassName('icon-block');
    this.userblock = new UserBlock(userblockPlace, userblockPlace);
    this.menu = new Menu(menuPlace, menuPlace);
    this.iconBlock = new IconBlock(iconsPlace, iconsPlace);

    [this.appContainerPlace] = this.wrapper.getElementsByClassName('application');
  }

  setTitle(text) {
    this.title.innerHTML = text;
    document.title = text;
  }

  show() {
    super.show();
    this.iconBlock.show();
    this.userblock.show();
    this.menu.show();
  }

  render() {
    this.iconBlock.render();
    this.userblock.render();
    this.menu.render();
  }
}
