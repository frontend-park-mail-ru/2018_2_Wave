import Element from '../../../element';
import AppTile from '../../components/app_tile/app_tile';

import template from './library.pug';
import '../../components/app_tile/app_tile.pcss';
import './library.pcss';

import '../../../../../static/img/terminal.jpg';

const apps = [
  {
    link: '/terminal',
    image: 'img/terminal.jpg',
    name: 'Terminal',
  },
  {
    link: '/terminal',
    image: 'img/terminal.jpg',
    name: 'Terminal',
  },
  {
    link: '/terminal',
    image: 'img/terminal.jpg',
    name: 'Terminal',
  },
  {
    link: '/terminal',
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
      const tile = new AppTile(this.panel, app);
      tile.show();
    });
  }
}
