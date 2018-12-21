import Element from '../../../element';

import '../app_tile/app_tile';

import './app-table.pcss';
import template from './app-table.pug';

// import storeApps from './mock';


export default class AppTable extends Element {
  constructor(parent, wrapper) {
    super(template, parent, wrapper || parent);
  }

  render() {
    super.render();
  }
}
