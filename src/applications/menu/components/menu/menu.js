import Element from '../../../element';

import '../tile-panel/tile-panel.pcss';
import '../tile/tile.pcss';
import './menu.pcss';

import template from './menu.pug';

const tiles = [
  {
    link: '/library',
    name: 'Library',
    icon: 'apps',
  },
  {
    link: '/store',
    name: 'Store',
    icon: 'local_mall',
  },
  {
    link: '/settings',
    name: 'Settings',
    icon: 'settings',
  },
  {
    link: '/about',
    name: 'About us',
    icon: 'accessible_forward',
  },
];


export default class Menu extends Element {
  constructor(parent, wrapper) {
    super(template, parent, wrapper);
  }

  show() {
    super.show();
    if (!this.rendered) {
      // render only one time, because menu is unchangeable
      this.render();
    }
  }

  render() {
    super.render({ tiles });
  }
}
