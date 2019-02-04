import Component from '../component';

import template from './loader.pug';
import './loader.pcss';

export default class Loader extends Component {
  constructor(parent, markTag) {
    super({ template, parent, markTag });
  }

  async start() {
    if (!this.rendered) await this.render();
    super.show();

    this.timeoutPromise = new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  }

  async stop() {
    await this.timeoutPromise;
    super.hide();
  }
}
