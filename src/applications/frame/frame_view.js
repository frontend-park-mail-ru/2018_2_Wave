import Element from '../element';

import frameTemplate from './templates/frame.pug';

import './styles/frame.css';

export default class FrameView extends Element {
  constructor(parent) {
    super(frameTemplate, parent);
  }

  draw(source) {
    this.render(source);
    this.show();
  }

  render(source) {
    super.render({ source });
  }

  show() {
    super.show();
  }

  clear() {
    [this.frame] = this.wrapper.getElementsByClassName('frame');
    this.frame.innerHTML = '';
  }
}
