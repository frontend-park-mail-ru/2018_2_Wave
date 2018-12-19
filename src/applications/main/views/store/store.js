import Element from '../../../element';
import AppTile from '../../components/app_tile/app_tile';
import List from '../../components/list/list';

import template from './store.pug';
import '../../components/app_tile/app_tile.pcss';
import './store.pcss';

import '../../../../../static/img/terminal.jpg';

import storeApps from './mock';

export default class StoreView extends Element {
  constructor(parent, wrapper, views) {
    super(template, parent, wrapper);
    super.render();

    this.title = 'Store';

    this.parentViews = views;
    [this.panel] = this.wrapper.getElementsByClassName('store__tile-panel');
    [this.listPlace] = document.getElementsByClassName('list');

    this.list = new List(this.listPlace, this.listPlace);
    this.listPlace.addEventListener('click', (event) => {
      const categoryName = event.target.innerText.toLowerCase();
      if (categoryName) this.render(categoryName);
    });

    this.list.render(Object.keys(storeApps));
  }

  render(category) {
    if (!category || !(category in storeApps)) category = 'all';
    this.panel.innerHTML = '';
    storeApps[category].forEach((app) => {
      const tile = new AppTile(this.panel, app);
      tile.show();
    });
  }

  show() {
    const [grid] = document.getElementsByClassName('grid-common');
    if (!grid.classList.contains('store__grid')) {
      grid.classList.add('store__grid');
    }

    this.list.show();
    super.show();
    // this.parentViews.env.menu.hide();
  }

  hide() {
    const [grid] = document.getElementsByClassName('grid-common');
    if (grid.classList.contains('store__grid')) {
      grid.classList.remove('store__grid');
    }

    this.list.hide();
    super.hide();
    // this.parentViews.env.menu.show();
  }
}
