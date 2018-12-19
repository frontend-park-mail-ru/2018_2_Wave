import Element from '../../../element';

import './list.pcss';

import template from './list.pug';

const categories = [
  'all',
  'new',
  'popular',
  '2018_2',
  '2018_1',
  '2017_2',
];

export default class List extends Element {
  constructor(parent, wrapper) {
    super(template, parent, wrapper || parent);
    this.render();
  }

  render() {
    console.log(this.wrapper);
    super.render({ categories });
  }
}
