import Element from '../../../element';
import AppTile from '../../components/app_tile/app_tile';

import template from './home.pug';
import '../../components/app_tile/app_tile.pcss';
import './home.pcss';

import router from '../../../../modules/router';
import { getMyApps } from '../../../../modules/network';
import GameApp from '../../../frame/game_app';

export default class HomeView extends Element {
  constructor(parent, wrapper) {
    super(template, parent, wrapper);
    super.render();

    this.title = 'Home';

    [this.panel] = this.wrapper.getElementsByClassName('home-page__tile-panel');
  }

  scroller(ev) {
    if (ev.which === 37 || ev.which === 39) ev.preventDefault();
    if (ev.which === 39 && (Date.now() - this.lastLeft) > 400) {
      this.scrollPanelLeft();
      this.lastLeft = Date.now();
    } else if (ev.which === 37 && (Date.now() - this.lastRight) > 400) {
      this.scrollPanelRight();
      this.lastRight = Date.now();
    }
  }

  startScroller() {
    this.lastLeft = Date.now();
    this.lastRight = Date.now();
    document.addEventListener('keydown', this.scroller);
  }

  stopScroller() {
    document.removeEventListener('keydown', this.scroller);
  }

  scrollPanelLeft() {
    const [tile] = this.panel.children;
    this.panel.scrollLeft += tile.offsetWidth;
  }

  scrollPanelRight() {
    const [tile] = this.panel.children;
    this.panel.scrollLeft -= tile.offsetWidth;
  }

  show() {
    const [grid] = document.getElementsByClassName('grid-common');
    if (!grid.classList.contains('home-page__grid')) {
      grid.classList.add('home-page__grid');
    }
    this.startScroller();
    super.show();
  }

  hide() {
    const [grid] = document.getElementsByClassName('grid-common');
    if (grid.classList.contains('home-page__grid')) {
      grid.classList.remove('home-page__grid');
    }
    this.stopScroller();
    super.hide();
  }

  async render() {
    const { err, apps } = await getMyApps();
    if (err) {
      console.log(err);
    } else {
      console.log(apps);
      this.panel.innerHTML = '';
      apps.forEach((app) => {
        if (!router.checkRegister(app.link)) {
          router.registerApp(app.link, GameApp, app.name);
        }
        const tile = new AppTile(this.panel, app, 'home-page__tile');
        tile.show();
      });
    }
  }
}
