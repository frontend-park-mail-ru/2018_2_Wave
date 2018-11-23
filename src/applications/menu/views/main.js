import Element from '../../element';
import UserBlock from '../components/userblock';


import template from '../templates/main.pug';


export default class MainView extends Element {
  constructor(parent) {
    super(template, parent);
    super.render();
    const [userblockPlace] = this.wrapper.getElementsByClassName('header');
    console.log(userblockPlace);
    this.userblock = new UserBlock(userblockPlace);
  }

  getContainer() {
    if (!this.rendered) this.render();
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
