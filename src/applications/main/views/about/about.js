import Element from '../../../element';
import List from '../../components/list/list';
import FormAboutUs from '../../components/formAboutUs/formAboutUs';

import localeManager from '../../../../modules/locale';
import bus from '../../../../modules/bus';

import template from './about.pug';
import '../../components/app_tile/app_tile.pcss';
import './about.pcss';

import '../../../../../static/img/terminal.jpg';

const categories = [
  'Дмитрий Палий',
  'Андрюхов Артём',
  'Липко Дмитрий',
  'Лебедев Илья',
  'Глазачева Ксения',
];

const categoriesInt = [
  'Paliy Dmitry',
  'Adryukhov Artem',
  'Lipko Dmitry',
  'Lebedev Ilya',
  'Glazacheva Ksenia',
];

export default class AboutView extends Element {
  constructor(parent, wrapper, views) {
    super(template, parent, wrapper);
    super.render();

    this.title = 'About us';

    this.parentViews = views;
    // [this.panel] = this.wrapper.getElementsByClassName('about');
    [this.listPlace] = document.getElementsByClassName('about-list');
    [this.formAboutUsPlace] = document.getElementsByClassName('form-about-us');

    this.list = new List(this.listPlace);
    this.formAboutUs = new FormAboutUs(this.formAboutUsPlace);
    this.listPlace.addEventListener('click', (event) => {
      const categoryName = event.target.innerText.toLowerCase();
      if (categoryName) this.render(categoryName);
    });

    this.render = this.render.bind(this);
    bus.listen('localeChanged', this.render);
  }

  show() {
    const [grid] = document.getElementsByClassName('grid-common');
    if (!grid.classList.contains('about__grid')) {
      grid.classList.add('about__grid');
    }

    this.formAboutUs.show();
    // this.description.show();
    this.list.show();
    super.show();
    // this.parentViews.env.menu.hide();
  }

  hide() {
    const [grid] = document.getElementsByClassName('grid-common');
    if (grid.classList.contains('about__grid')) {
      grid.classList.remove('about__grid');
    }

    this.formAboutUs.hide();
    // this.description.hide();
    this.list.hide();
    super.hide();
    // this.parentViews.env.menu.show();
  }

  render() {
    const { locale } = localeManager;
    if (locale !== 'RU') {
      this.list.render(categoriesInt);
    } else {
      this.list.render(categories);
    }
  }
}
