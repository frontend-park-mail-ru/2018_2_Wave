import Element from '../../../element';
import { getApp } from '../../../../modules/network';

import '../tile-panel/tile-panel.pcss';
import '../tile/tile.pcss';
import './menu.pcss';

import template from './menu.pug';
import tileTemplate from './tile.pug';
import appTileTemplate from './menu_app-tile.pug';
import bus from '../../../../modules/bus';
import localeManager from '../../../../modules/locale';

const tiles = [
  {
    link: '/home',
    name_en: 'Home',
    name_de: 'Zuhause',
    name_ru: 'Домой',
    icon: 'home',
  },
  {
    link: '/store',
    name_en: 'Store',
    name_de: 'Laden',
    name_ru: 'Магазин',
    icon: 'local_mall',
  },
  {
    link: '/about',
    name_en: 'About us',
    name_de: 'Über uns',
    name_ru: 'О нас',
    icon: 'accessible_forward',
  },
];


export default class Menu extends Element {
  constructor(parent, wrapper) {
    super(template, parent, wrapper);
    super.render();
    [this.panel] = this.wrapper.getElementsByClassName('menu__tile-panel');
    this.render();

    bus.listen('addTile', this.addTile.bind(this));

    bus.listen('localeChanged', this.render.bind(this));
  }

  async addTile(appName) {
    const { err, app } = await getApp(appName);
    if (err) {
      console.error(err);
      return false;
    }

    const foundTiles = this.panel.querySelectorAll(`[name="${app.name}"]`);
    const childs = this.panel.childNodes;

    console.log(foundTiles);

    if (foundTiles.length !== 0) foundTiles[0].remove();

    if (childs.length <= 3) {
      this.panel.innerHTML += appTileTemplate({ tile: app });
      return true;
    }
    console.log(childs);

    const mock = document.createElement('div');
    mock.innerHTML = appTileTemplate({ tile: app });
    const [elem] = mock.getElementsByClassName('menu__tile');

    this.panel.insertBefore(elem, childs[3]);
    return true;
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
    this.panel.innerHTML = '';
    tiles.forEach((tile) => {
      const newTile = {
        link: tile.link,
        name: tile[`name_${localeManager.locale.toLowerCase()}`],
        icon: tile.icon,
      };

      this.panel.innerHTML += tileTemplate({ tile: newTile });
      // this.tileList += tile;
    });
    console.log('menu rendered');
  }
}
