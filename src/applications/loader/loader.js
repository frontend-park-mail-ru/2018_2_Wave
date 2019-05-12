/* eslint-disable no-unused-expressions */
import Component from '../component';
import bus from '../../modules/bus';

import template from './loader.pug';
import '../../../static/img/loader_dev.svg';
import './loader.pcss';

export default class Loader extends Component {
  constructor(parent, markTag) {
    super({ template, parent, markTag });

    bus.listen('loaded', this.stop.bind(this));
  }

  async start() {
    if (!this.rendered) await this.render();
    super.show();

    this.timeoutPromise = new Promise((resolve) => {
      setTimeout(resolve, 2600);
    });
  }

  async stop() {
    await this.timeoutPromise;
    bus.emit('loaderHidden');
    super.hide();
    // TODO: hide animation here
    super.delete();
  }
}
