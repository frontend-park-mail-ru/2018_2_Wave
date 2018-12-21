import Element from '../../../element';

import '../tile-panel/tile-panel.pcss';
import '../tile/tile.pcss';
import './menu.pcss';

import template from './menu.pug';

const tiles = [
  {
    link: '/home',
    name: 'Home',
    icon: 'home',
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
  {
    link: '/terminal',
    name: 'Terminal',
    icon: 'video_label',
  },
  {
    link: '/terminal',
    name: 'Terminal',
    icon: 'video_label',
  },
  {
    link: '/terminal',
    name: 'Terminal',
    icon: 'video_label',
  },
  {
    link: '/terminal',
    name: 'Terminal',
    icon: 'video_label',
  },
];


export default class Menu extends Element {
  constructor(parent, wrapper) {
    super(template, parent, wrapper);
  }

  show() {
    if (!this.rendered) this.render();

    const showAnimation = this.wrapper.animate({
      transform: [
        'translateY(250px)',
        'translateY(0px)',
      ],
    }, {
      duration: 200,
      fill: 'forwards',
      easing: 'cubic-bezier(.36,1.08,.55,.93)',
    });
    showAnimation.pause();
    showAnimation.onfinish = () => super.show();
    showAnimation.play();
  }

  hide() {
    const hideAnimation = this.wrapper.animate({
      transform: [
        'translateY(0px)',
        'translateY(250px)',
      ],
    }, {
      duration: 200,
      fill: 'forwards',
      easing: 'cubic-bezier(.36,1.08,.55,.93)',
    });
    hideAnimation.pause();
    hideAnimation.onfinish = () => super.hide();
    hideAnimation.play();
  }

  render() {
    super.render({ tiles });
  }
}
