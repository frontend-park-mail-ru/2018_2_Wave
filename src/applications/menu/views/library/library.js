import Element from '../../../element';
import AppTile from '../../components/app_tile/app_tile';

import template from './library.pug';
import '../../components/app_tile/app_tile.pcss';
import './library.pcss';

import '../../../../../static/img/terminal.jpg';
import '../../../../../static/img/snake.jpg';

const apps = [
  {
    link: '/terminal',
    image: '/img/terminal.jpg',
    name: 'Terminal',
  },
  {
    link: '/snake',
    image: '/img/snake.jpg',
    name: 'Snake',
  },
  {
    link: '/terminal',
    image: '/img/terminal.jpg',
    name: 'Terminal',
  },
  {
    link: '/snake',
    image: '/img/snake.jpg',
    name: 'Snake',
  },
  {
    link: '/terminal',
    image: '/img/terminal.jpg',
    name: 'Terminal',
  },
  {
    link: '/snake',
    image: '/img/snake.jpg',
    name: 'Snake',
  },
];


export default class LibraryView extends Element {
  constructor(parent, wrapper) {
    super(template, parent, wrapper);
    super.render();

    this.title = 'Library';

    [this.panel] = this.wrapper.getElementsByClassName('library__tile-panel');
  }

  render() {
    if (this.panel.innerHTML !== '') return;
    apps.forEach((app) => {
      const tile = new AppTile(this.panel, app);
      tile.show();
    });
  }
}
