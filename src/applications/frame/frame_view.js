import Element from '../element';

import frameTemplate from './templates/frame.pug';


export default class FrameView extends Element {
  constructor(parent) {
    super(frameTemplate, parent);
    [this.frame] = this.wrapper.getElementsByClassName('frame');
  }

  render() {
    if (this.rendered) return;
    super.render();
  }

  clear() {
    this.frame.innerHTML = '';
  }

  openSource() {
    
  }
}
