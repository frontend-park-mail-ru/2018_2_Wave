import Element from '../../../element';
import AppTile from '../../components/app_tile/app_tile';

import template from './store.pug';
import '../../components/app_tile/app_tile.pcss';
import './store.pcss';

import '../../../../../static/img/terminal.jpg';

const apps = [
  {
    link: '/terminal',
    image: 'img/terminal.jpg',
    name: 'Купи говно',
  },
  {
    link: '/terminal',
    image: 'img/terminal.jpg',
    name: 'Купи говно',
  },
  {
    link: '/terminal',
    image: 'img/terminal.jpg',
    name: 'Купи говно',
  },
];


export default class StoreView extends Element {
  constructor(parent, wrapper) {
    super(template, parent, wrapper);
    super.render();

    this.title = 'Store';

    [this.panel] = this.wrapper.getElementsByClassName('store__tile-panel');
  }

  render() {
    if (this.panel.innerHTML !== '') return;
    apps.forEach((app) => {
      const tile = new AppTile(this.panel, app);
      tile.show();
    });
  }
}
