import Element from '../../../element';


import template from './icon-block.pug';
import './icon-block.pcss';


export default class IconBlock extends Element {
  constructor(parent, wrapper) {
    super(template, parent, wrapper || parent);
    this.render();

    const date = new Date();
    const timeout = (60 - date.getSeconds()) * 1000;
    console.log(timeout);
    setTimeout(() => {
      this.render();
      setInterval(() => this.render(), 60000);
    }, timeout);
  }

  render() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const time = `${hours}:${(minutes < 10) ? 0 : ''}${minutes}`;

    super.render({ time });
  }
}
