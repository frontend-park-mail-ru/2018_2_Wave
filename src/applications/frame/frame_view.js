import Element from '../element';

import frameTemplate from './templates/frame.pug';

import './styles/frame.css';

export default class FrameView extends Element {
  constructor(parent, source) {
    super(frameTemplate, parent);
    this.render(source);
    [this.frame] = this.wrapper.getElementsByClassName('frame');
    this.show();
  }

  render(source) {
    super.render({ source });
  }

  clear() {
    this.frame.innerHTML = '';
  }
}
