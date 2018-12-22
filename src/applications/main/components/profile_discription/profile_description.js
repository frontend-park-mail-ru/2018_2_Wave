import Element from '../../../element';

import bus from '../../../../modules/bus';
import { getApp, addApp } from '../../../../modules/network';

import template from './profile_description.pug';
import './profile_description.pcss';


export default class ProfileDescription extends Element {
  constructor(parent, wrapper) {
    super(template, parent, wrapper || parent);

    bus.listen('profile', this.render.bind(this));

    this.render();
  }

  async render(appName) {
    if (appName) {
      const { err, app } = await getApp(appName);
      if (err) console.error(err);
      this.shownApp = app;
      super.render({ app });
      return;
    }

    this.shownApp = null;
    super.render();
  }
}
