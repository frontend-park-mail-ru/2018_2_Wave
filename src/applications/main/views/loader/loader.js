import Component from '../../../component';

import template from './loader.pug';
import './loader.pcss';

export default class Loader extends Component {
  constructor(parent, markTag = 'loader') {
    super({ template, parent, markTag });
  }
}
