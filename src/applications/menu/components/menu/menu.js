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


    this.showAnimation = this.wrapper.animate({
      transform: [
        'translateY(250px)',
        'translateY(0px)',
      ],
    }, {
      duration: 200,
      fill: 'forwards',
      easing: 'cubic-bezier(.36,1.08,.55,.93)',
    });
    this.showAnimation.pause();
  }

  show() {
    if (!this.rendered) {
      // render only one time, because menu is unchangeable
      this.render();
    }

    this.showAnimation.onfinish = () => {
      super.show();
    };

    this.showAnimation.play();
  }

  hide() {
    this.showAnimation.onfinish = () => {
      super.hide();
    };

    this.showAnimation.reverse();
  }

  render() {
    super.render({ tiles });
  }
}
