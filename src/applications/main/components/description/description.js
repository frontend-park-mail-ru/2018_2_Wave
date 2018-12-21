import Element from '../../../element';

import bus from '../../../../modules/bus';
import { getApp } from '../../../../modules/network';

import template from './description.pug';
import './description.pcss';


const application = {
  link: '/terminal',
  image: '/img/terminal.jpg',
  name: 'Terminal',
  about: 'Best terminal app you have ever seen.',
  installs: 70,
  place: 2,
  added: true,
};


export default class Description extends Element {
  constructor(parent, wrapper) {
    super(template, parent, wrapper || parent);

    bus.listen('about', this.render.bind(this));

    this.render();
  }

  async render(appName) {
    if (appName) {
      console.log('rendering info', appName);
      const { err, app } = await getApp(appName);

      console.log(err, app);

      super.render({ app });
    }

    super.render();
  }
}
