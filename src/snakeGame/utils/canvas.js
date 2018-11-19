import Size from '../model/size';

export default class Canvas {
  constructor(root) {
    [this.canvas] = root.getElementsByClassName('canvas');
    this.context = this.canvas.getContext('2d');
  }

  getSize() {
    return new Size(+this.canvas.width, +this.canvas.height);
  }

  getContext() {
    return this.context;
  }

  setSize(size) {
    if (!(size instanceof Size)) {
      throw new TypeError('Invalid size instance');
    }

    this.size = {
      width: this.canvas.width,
      height: this.canvas.height,
    };
    this.canvas.width = size.width;
    this.context.canvas.height = size.height;
  }

}
