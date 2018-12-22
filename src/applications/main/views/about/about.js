import Element from '../../../element';
import List from '../../components/list/list';
import FormAboutUs from '../../components/formAboutUs/formAboutUs';

import template from './about.pug';
import '../../components/app_tile/app_tile.pcss';
import './about.pcss';

import '../../../../../static/img/terminal.jpg';

const categories = [
  'Дмитрий Палий',
  'Глазачева Ксения',
  'Лебедев Илья',
  'Липко Дмитрий',
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

    this.list.render(categories);
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
}
