import './app_container.pcss';

import Component from '../../../component';
import template from './app_container.pug';


export default class AppContainer extends Component {
  constructor({ parent, markTag }) {
    super({ template, parent, markTag });
  }

  async render() {
    await super.render();
    [this.screen] = this.body.getElementsByClassName('screen');
  }
}
