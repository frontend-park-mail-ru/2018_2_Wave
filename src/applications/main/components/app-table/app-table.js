import { getAllApps } from '../../../../modules/network';

import Element from '../../../element';

import '../app_tile/app_tile';

import './app-table.pcss';
import template from './app-table.pug';
import appTemplate from './app.pug';

import bus from '../../../../modules/bus';

export default class AppTable extends Element {
  constructor(parent, wrapper) {
    super(template, parent, wrapper || parent);
    this.wrapper.addEventListener('click', (ev) => {
      if (ev.target !== HTMLImageElement) return;
      const name = ev.target.getAttribute('name');
      bus.emit('about', name);
    });
  }

  async render(askedCategory) {
    console.log('rendering matrix');
    let category;
    if (!askedCategory) category = 'all';

    if (category === 'all') {
      const { apps, err } = await getAllApps();
      console.log(apps, err);
      if (!err) {
        apps.apps.forEach((app) => {
          this.wrapper.innerHTML += appTemplate({ app });
        });
      }
    }
  }
}
