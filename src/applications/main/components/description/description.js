import Element from '../../../element';

import bus from '../../../../modules/bus';
import { getApp, addApp } from '../../../../modules/network';

import template from './description.pug';
import './description.pcss';


export default class Description extends Element {
  constructor(parent, wrapper) {
    super(template, parent, wrapper || parent);

    bus.listen('about', this.render.bind(this));

    this.wrapper.addEventListener('click', async (ev) => {
      console.log(ev.target);
      if (ev.target.classList.contains('add-button')) {
        const { err } = await addApp(this.shownApp.name);
        if (err) console.error(err);
      }
    });

    this.render();
  }

  async render(appName) {
    if (appName) {
      console.log('rendering info', appName);
      const { err, app } = await getApp(appName);

      console.log(err, app);
      this.shownApp = app;
      super.render({ app });
      return;
    }

    this.shownApp = null;
    super.render();
  }
}
