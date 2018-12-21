import Element from '../../../element';


import template from './icon-block.pug';
import './icon-block.pcss';


export default class IconBlock extends Element {
  constructor(parent, wrapper) {
    super(template, parent, wrapper || parent);
    this.date = new Date();
    this.render();
    setTimeout(() => {
      setInterval(() => this.render(), 60000);
    }, 60 - this.date.getSeconds());
  }

  render() {
    const hours = this.date.getHours();
    const minutes = this.date.getMinutes();
    const time = `${hours}:${(minutes < 10) ? 0 : ''}${minutes}`;

    super.render({ time });
  }
}
