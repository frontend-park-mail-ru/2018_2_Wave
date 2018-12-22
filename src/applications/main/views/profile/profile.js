import Element from '../../../element';

import template from './profile.pug';
import '../../components/app_tile/app_tile.pcss';
import './profile.pcss';

import Profile from '../../components/profile/profile';
import AppTable from '../../components/app-table/app-table';


export default class ProfileView extends Element {
  constructor(parent, wrapper) {
    super(template, parent, wrapper);
    super.render();

    this.title = 'Profile';

    [this.panel] = this.wrapper.getElementsByClassName('profile-page__tile-panel');
    [this.userDataPlace] = document.getElementsByClassName('profile__user-data');
    [this.appTablePlace] = document.getElementsByClassName('app-table');

    this.userData = new Profile(this.userDataPlace, this.userDataPlace);
    this.appTable = new AppTable(this.appTablePlace, this.appTablePlace);
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

  // startScroller() {
  //   this.lastLeft = Date.now();
  //   this.lastRight = Date.now();
  //   document.addEventListener('keydown', this.scroller);
  // }

  // stopScroller() {
  //   document.removeEventListener('keydown', this.scroller);
  // }

  // scrollPanelLeft() {
  //   const [tile] = this.panel.children;
  //   this.panel.scrollLeft += tile.offsetWidth;
  // }

  // scrollPanelRight() {
  //   const [tile] = this.panel.children;
  //   this.panel.scrollLeft -= tile.offsetWidth;
  // }

  show() {
    const [grid] = document.getElementsByClassName('grid-common');
    if (!grid.classList.contains('profile__grid')) {
      grid.classList.add('profile__grid');
    }
    // this.startScroller();
    this.appTable.show();
    this.userData.show();
    super.show();
  }

  hide() {
    const [grid] = document.getElementsByClassName('grid-common');
    if (grid.classList.contains('profile__grid')) {
      grid.classList.remove('profile__grid');
    }
    // this.stopScroller();
    this.userData.hide();
    this.appTable.hide();
    super.hide();
  }

  render() {
    this.userData.render();
    this.appTable.render();
    // if (this.panel.innerHTML !== '') return;
    // apps.forEach((app) => {
    //   const tile = new AppTile(this.panel, app, 'profile__tile');
    //   tile.show();
    // });
  }
}
