import './env.pcss';

import Component from '../../../component';

import UserBlock from '../../components/userblock/userblock';
import Menu from '../../components/menu/menu';
import Clock from '../../components/clock/clock';

import template from './env.pug';

import '../../../../../static/fonts/Gilroy-ExtraBold.otf';
import '../../../../../static/fonts/Gilroy-Light.otf';


export default class Enviroment extends Component {
  constructor(parent) {
    super({ template, parent });

    this.userblock = new UserBlock(this, 'userblock');
    this.menu      = new Menu(this, 'menu');
    this.clock     = new Clock(this, 'clock');
  }

  setTitle(text) {
    if (!this.rendered) return false;

    const [title] = this.wrapper.getElementsByClassName('title__text');
    title.innerHTML = text;
    document.title = text;

    return true;
  }
}
