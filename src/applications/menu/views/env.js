import Element from '../../element';
import UserBlock from '../components/userblock';


import template from '../templates/main.pug';


export default class Enviroment extends Element {
  constructor(parent) {
    super(template, parent);
    super.render();
    const [userblockPlace] = this.wrapper.getElementsByClassName('header');
    this.userblock = new UserBlock(userblockPlace);
  }

  getContainer() {
    [this.content] = this.wrapper.getElementsByClassName('content');
    return this.content;
  }

  show() {
    super.show();
    this.userblock.show();
  }

  async render() {
    this.userblock.render();
  }
}
