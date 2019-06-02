import { getAllApps } from '../../../../modules/network';

import Component from '../../../component';

// import '../app_tile/app_tile';

import './app-table.pcss';
import template from './app-table.pug';
import appTemplate from './app.pug';

import bus from '../../../../modules/bus';

export default class AppTable extends Component {
  constructor(parent, markTag = 'AppTable') {
    super({ template, parent, markTag });
    // this.wrapper.addEventListener('click', (ev) => {
    //   if (!(ev.target instanceof HTMLImageElement)) return;
    //   const name = ev.target.getAttribute('name');
    //   console.log('emitted');
    //   bus.emit('about', name);
    // });
  }

  async getData() {
    console.log('rendering matrix');

    const { apps, err } = await getAllApps();
    console.log(apps, err);
    return { apps };
  }

  // async render() {
  //   if (!err) {
  //     apps.apps.forEach((app) => {
  //       this.wrapper.innerHTML += appTemplate({ app });
  //     });
  //   }
  // }
}
