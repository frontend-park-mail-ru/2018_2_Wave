import Element from '../../../element';

import './list.pcss';

import template from './list.pug';


export default class List extends Element {
  constructor(parent, wrapper) {
    super(template, parent, wrapper || parent);
  }

  render(categories) {
    super.render({ categories });
  }
}
