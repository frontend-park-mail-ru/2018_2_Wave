import Element from '../../../element';


import template from './app_tile.pug';
import './app_tile.pcss';


export default class AppTile extends Element {
  constructor(parent, data, cssClass) {
    super(template, parent);
    this.data = data;
    this.render(data);
    const [element] = this.wrapper.getElementsByClassName('app__tile');
    element.classList.add(cssClass);
  }

  render(data) {
    super.render({ tile: data });
  }
}
