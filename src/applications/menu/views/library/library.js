import Element from '../../../element';
import AppTile from '../../components/app_tile/app_tile';

import template from './library.pug';
import '../../components/app_tile/app_tile.pcss';
import './library.pcss';


const apps = [
  {
    image: 'img/terminal.jpg',
    name: 'Terminal',
  },
  {
    image: 'img/terminal.jpg',
    name: 'Terminal',
  },
  {
    image: 'img/terminal.jpg',
    name: 'Terminal',
  },
  {
    image: 'img/terminal.jpg',
    name: 'Terminal',
  },
];


export default class LibraryView extends Element {
  constructor(parent) {
    super(template, parent, parent);
    super.render();

    [this.panel] = this.wrapper.getElementsByClassName('library__tile-panel');
  }

  render() {
    apps.forEach((app) => {
      console.log(app);
      const tile = new AppTile(this.panel, app);
      tile.show();
    });
  }
}
