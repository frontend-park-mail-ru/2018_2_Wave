import Element from '../../../element';

import bus from '../../../../modules/bus';
// import { getApp, addApp } from '../../../../modules/network';

import template from './formAboutUs.pug';
import './formAboutUs.pcss';


export default class FormAboutUs extends Element {
  constructor(parent, wrapper) {
    super(template, parent, wrapper || parent);

    bus.listen('about', this.render.bind(this));
    this.render();
  }

  render(appName) {
    // if (appName) {
    //   const { err, app } = await getApp(appName);
    //   if (err) console.error(err);
    //   this.shownApp = app;
    //   super.render({ app });
    //   return;
    // }

    // this.shownApp = null;
    super.render();
  }
}
