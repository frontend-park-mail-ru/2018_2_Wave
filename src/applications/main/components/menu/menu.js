import Component from '../../../component';
import { getApp } from '../../../../modules/network';

import '../tile-panel/tile-panel.pcss';
import '../tile/tile.pcss';
import './menu.pcss';

import template from './menu.pug';
import appTileTemplate from './menu_app-tile.pug';
import bus from '../../../../modules/bus';

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
    link: '/about',
    name: 'About us',
    icon: 'accessible_forward',
  },
];


export default class Menu extends Component {
  constructor({ parent, markTag = 'menu' }) {
    /* eslint arrow-body-style: ["error", "as-needed"] */
    super({ template, parent, markTag });


    this.render();

    bus.listen('addTile', this.addTile.bind(this));
    this.getData = () => tiles;
  }

  async addTile(appName) {
    const { err, app } = await getApp(appName);
    if (err) {
      console.error(err);
      return false;
    }

    const [panel] = this.wrapper.getElementsByClassName('menu__tile-panel');

    const foundTiles = panel.querySelectorAll(`[name="${app.name}"]`);
    const childs = panel.childNodes;

    console.log(foundTiles);

    if (foundTiles.length !== 0) foundTiles[0].remove();

    if (childs.length <= 3) {
      panel.innerHTML += appTileTemplate({ tile: app });
      return true;
    }
    console.log(childs);

    const mock = document.createElement('div');
    mock.innerHTML = appTileTemplate({ tile: app });
    const [elem] = mock.getElementsByClassName('menu__tile');

    panel.insertBefore(elem, childs[3]);
    return true;
  }

  // show() {
  //   if (!this.rendered) this.render();

  //   const showAnimation = this.wrapper.animate({
  //     transform: [
  //       'translateY(250px)',
  //       'translateY(0px)',
  //     ],
  //   }, {
  //     duration: 200,
  //     fill: 'forwards',
  //     easing: 'cubic-bezier(.36,1.08,.55,.93)',
  //   });
  //   showAnimation.pause();
  //   showAnimation.onfinish = () => super.show();
  //   showAnimation.play();
  // }

  // hide() {
  //   const hideAnimation = this.wrapper.animate({
  //     transform: [
  //       'translateY(0px)',
  //       'translateY(250px)',
  //     ],
  //   }, {
  //     duration: 200,
  //     fill: 'forwards',
  //     easing: 'cubic-bezier(.36,1.08,.55,.93)',
  //   });
  //   hideAnimation.pause();
  //   hideAnimation.onfinish = () => super.hide();
  //   hideAnimation.play();
  // }

  // render() {
  //   this.panel.innerHTML = '';
  //   tiles.forEach((tile) => {
  //     this.panel.innerHTML += tileTemplate({ tile });
  //     // this.tileList += tile;
  //   });
  // }
}
