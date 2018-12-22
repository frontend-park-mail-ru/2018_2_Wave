import Element from '../../../element';

import template from './profile.pug';
import '../../components/app_tile/app_tile.pcss';
import './profile.pcss';

import bus from '../../../../modules/bus';

import Profile from '../../components/profile/profile';
import AppTable from '../../components/app-table/app-table';
import ProfileDescription from '../../components/profile_discription/profile_description';


export default class ProfileView extends Element {
  constructor(parent, wrapper) {
    super(template, parent, wrapper);
    super.render();

    bus.listen('profile', this.render.bind(this));
    this.title = 'Profile';

    [this.panel] = this.wrapper.getElementsByClassName('profile-page__tile-panel');
    [this.userDataPlace] = document.getElementsByClassName('profile__user-data');
    [this.appTablePlace] = document.getElementsByClassName('app-table');
    [this.profileDescriptionPlace] = document.getElementsByClassName('profile-description-container');

    this.userData = new Profile(this.userDataPlace, this.userDataPlace);
    this.appTable = new AppTable(this.appTablePlace, this.appTablePlace);
    this.profileDescription = new ProfileDescription(this.profileDescriptionPlace);
  }

  show() {
    const [grid] = document.getElementsByClassName('grid-common');
    if (!grid.classList.contains('profile__grid')) {
      grid.classList.add('profile__grid');
    }

    this.appTable.show();
    this.userData.show();
    this.profileDescription.show();
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
    this.profileDescription.hide();
    // super.render();
  }

  render() {
    this.userData.render();
    this.appTable.render();
    this.profileDescription.render();
  }
}
