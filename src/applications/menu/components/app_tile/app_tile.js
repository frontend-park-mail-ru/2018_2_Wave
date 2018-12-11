import Element from '../../../element';


import template from './app_tile.pug';
import './app_tile.pcss';


export default class AppTile extends Element {
  constructor(parent, data) {
    super(template, parent);
    this.data = data;
    this.render(data);
  }

  render(data) {
    super.render({ tile: data });
  }
}
