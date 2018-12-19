import Element from '../../../element';
import AppTile from '../../components/app_tile/app_tile';
import List from '../../components/list/list';

import template from './store.pug';
import '../../components/app_tile/app_tile.pcss';
import './store.pcss';

import '../../../../../static/img/terminal.jpg';

const storeApps = [
  {
    link: '/terminal',
    image: '/img/terminal.jpg',
    name: 'Купи говно',
  },
  {
    link: '/terminal',
    image: '/img/terminal.jpg',
    name: 'Купи говно',
  },
  {
    link: '/terminal',
    image: '/img/terminal.jpg',
    name: 'Купи говно',
  },
  {
    link: '/terminal',
    image: '/img/terminal.jpg',
    name: 'Купи говно',
  },
];


export default class StoreView extends Element {
  constructor(parent, wrapper, views) {
    super(template, parent, wrapper);
    super.render();

    this.title = 'Store';

    this.parentViews = views;
    [this.panel] = this.wrapper.getElementsByClassName('store__tile-panel');
    [this.listPlace] = this.parentViews.main.wrapper.getElementsByClassName('list');
    this.list = new List(this.listPlace, this.listPlace);
  }

  render() {
    if (this.panel.innerHTML !== '') return;
    storeApps.forEach((app) => {
      const tile = new AppTile(this.panel, app);
      tile.show();
    });
  }

  show() {
    const [grid] = document.getElementsByClassName('grid-common');
    if (!grid.classList.contains('store__grid')) {
      grid.classList.add('store__grid');
    }

    super.show();
    this.parentViews.env.menu.hide();
  }

  hide() {
    const [grid] = document.getElementsByClassName('grid-common');
    if (grid.classList.contains('store__grid')) {
      grid.classList.remove('store__grid');
    }

    super.hide();
    this.parentViews.env.menu.show();
  }
}
