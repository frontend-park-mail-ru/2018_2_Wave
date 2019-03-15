import Element from '../../../element';
import List from '../../components/list/list';
import Description from '../../components/description/description';
import AppTable from '../../components/app-table/app-table';

import template from './store.pug';
import '../../components/app_tile/app_tile.pcss';
import './store.pcss';

import bus from '../../../../modules/bus';
import localeManager from '../../../../modules/locale';

import '../../../../../static/img/terminal.jpg';

const categories = [
  'New',
  'All',
  'Popular',
  '2018_2 semester',
  '2018_1 semester',
  '2017_2 semester',
];

const categories_ru = [
  'Новые',
  'Все',
  'Популярные',
  '2018_2 семестр',
  '2018_1 семестр',
  '2017_2 семестр',
];

const categories_de = [
  'Neue',
  'Alle',
  'Beliebt',
  '2018_2 Semester',
  '2018_1 Semester',
  '2017_2 Semester',
];

export default class StoreView extends Element {
  constructor(parent, wrapper, views) {
    super(template, parent, wrapper);
    super.render();

    this.title = 'Store';

    this.parentViews = views;
    [this.panel] = this.wrapper.getElementsByClassName('store__tile-panel');
    [this.listPlace] = document.getElementsByClassName('list');
    [this.descriptionPlace] = document.getElementsByClassName('description-container');
    [this.appTablePlace] = document.getElementsByClassName('app-table');

    this.appTable = new AppTable(this.appTablePlace, this.appTablePlace);
    this.description = new Description(this.descriptionPlace);
    this.list = new List(this.listPlace, this.listPlace);
    this.listPlace.addEventListener('click', (event) => {
      const categoryName = event.target.innerText.toLowerCase();
      if (categoryName) this.render(categoryName);
    });

    this.render = this.render.bind(this);
    bus.listen('localeChanged', this.render);
    this.render();
  }

  show() {
    const [grid] = document.getElementsByClassName('grid-common');
    if (!grid.classList.contains('store__grid')) {
      grid.classList.add('store__grid');
    }

    this.appTable.show();
    this.description.show();
    this.list.show();
    super.show();
    // this.parentViews.env.menu.hide();
  }

  hide() {
    const [grid] = document.getElementsByClassName('grid-common');
    if (grid.classList.contains('store__grid')) {
      grid.classList.remove('store__grid');
    }

    this.appTable.hide();
    this.description.hide();
    this.list.hide();
    super.hide();
    // this.parentViews.env.menu.show();
  }

  render() {
    const { locale } = localeManager;
    if (locale === 'RU') {
      this.list.render(categories_ru);
    } else if (locale === 'DE') {
      this.list.render(categories_de);
    } else {
      this.list.render(categories);
    }
  }
}
