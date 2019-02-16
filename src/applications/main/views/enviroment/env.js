import './env.pcss';

import Component from '../../../component';

import UserBlock from '../../components/userblock/userblock';
import Menu from '../../components/menu/menu';
import IconBlock from '../../components/icon-block/icon-block';

import template from './env.pug';

import '../../../../../static/fonts/Gilroy-ExtraBold.otf';
import '../../../../../static/fonts/Gilroy-Light.otf';


export default class Enviroment extends Component {
  constructor(parent) {
    super({ template, parent });

    this.userblock = new UserBlock(
      { parent: this, markTag: 'userblock' },
    );

    this.menu = new Menu(
      { parent: this, markTag: 'menu' },
    );

    this.iconBlock = new IconBlock(
      { parent: this, markTag: 'iconblock' },
    );
  }

  setTitle(text) {
    if (!this.rendered) return false;

    const [title] = this.wrapper.getElementsByClassName('title__text');
    title.innerHTML = text;
    document.title = text;

    return true;
  }

  // show() {
  //   super.show();
  //   // this.iconBlock.show();
  //   // this.userblock.show();
  //   // this.menu.show();
  // }

  // render() {
  //   this.iconBlock.render();
  //   this.userblock.render();
  //   this.menu.render();
  // }
}
