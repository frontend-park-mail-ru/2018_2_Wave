import Element from '../../element';

import template from './frame.pug';

import './frame.pcss';

export default class FrameView extends Element {
  constructor(parent, wrapper, source) {
    super(template, parent, wrapper);
    this.source = source;
    this.noRender = true;
  }

  render() {
    // console.log('here');
    // [this.frame] = this.wrapper.getElementsByClassName('frame');
    super.render({ source: this.source });
  }

  clear() {
    [this.frame] = this.wrapper.getElementsByClassName('frame');
    this.frame.innerHTML = '';
  }
}
