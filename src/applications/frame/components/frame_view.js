import Element from '../../element';

import template from './frame.pug';

// import './styles/frame.css';

export default class FrameView extends Element {
  constructor(parent, wrapper, source) {
    super(template, parent, wrapper);
    this.source = source;
  }

  render() {
    super.render({ source: this.source });
  }

  clear() {
    [this.frame] = this.wrapper.getElementsByClassName('frame');
    this.frame.innerHTML = '';
  }
}
