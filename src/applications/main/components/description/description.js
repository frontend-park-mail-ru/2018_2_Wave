import Element from '../../../element';

import './description.pcss';

import template from './description.pug';


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
    this.render(application);
  }

  render(app) {
    super.render({ app });
  }
}
