import Element from '../../../element';

import './description.pcss';

import template from './description.pug';


const application = {
  link: '/terminal',
  image: '/img/terminal.jpg',
  name: 'Купи всё говно',
};


export default class Description extends Element {
  constructor(parent, wrapper) {
    super(template, parent, wrapper || parent);
  }

  render() {
    super.render(application);
  }
}
