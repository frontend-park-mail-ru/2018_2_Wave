import Component from '../../../component';
// import List from '../../components/list/list';
// import Description from '../../components/description/description';
import AppTable from '../../components/app-table/app-table';

import template from './store.pug';
import '../../components/app_tile/app_tile.pcss';
import './store.pcss';

import '../../../../../static/img/terminal.jpg';

const categories = [
  'new',
  'all',
  'popular',
  '2018_2',
  '2018_1',
  '2017_2',
];

export default class StoreView extends Component {
  constructor(parent, markTag = 'store') {
    super({ template, parent, markTag });

    this.title = 'Store';

    // [this.panel] = this.wrapper.getElementsByClassName('store__tile-panel');
    // [this.listPlace] = document.getElementsByClassName('list');
    // [this.descriptionPlace] = document.getElementsByClassName('description-container');
    // [this.appTablePlace] = document.getElementsByClassName('app-table');

    this.appTable = new AppTable(this, 'app-table');
    // this.description = new Description(this.descriptionPlace);
    // this.list = new List(this.listPlace, this.listPlace);
    // this.listPlace.addEventListener('click', (event) => {
    //   const categoryName = event.target.innerText.toLowerCase();
    //   if (categoryName) this.render(categoryName);
    // });

    // this.list.render(categories);
  }

  // show() {
  //   const [grid] = document.getElementsByClassName('grid-common');
  //   if (!grid.classList.contains('store__grid')) {
  //     grid.classList.add('store__grid');
  //   }

  //   this.appTable.show();
  //   // this.description.show();
  //   // this.list.show();
  //   super.show();
  //   // this.parentViews.env.menu.hide();
  // }

  // hide() {
  //   const [grid] = document.getElementsByClassName('grid-common');
  //   if (grid.classList.contains('store__grid')) {
  //     grid.classList.remove('store__grid');
  //   }

  //   this.appTable.hide();
  //   // this.description.hide();
  //   // this.list.hide();
  //   super.hide();
  //   // this.parentViews.env.menu.show();
  // }
}
