import Size from '../model/size';

export default class Canvas {
  constructor() {
    [this.canvas] = document.getElementsByClassName('canvas');
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

    this.canvas.width = size.width;
    this.canvas.width = size.width;

    this.context.canvas.height = size.height;
    this.context.canvas.height = size.height;
  }

  clear(fadeOpacity) {
    const size = this.getSize();
    if (typeof fadeOpacity === 'number') {
      this.context.fillStyle = `rgba(0, 0, 0, ${fadeOpacity})`;
      this.context.fillRect(0, 0, size.width, size.height);
    } else {
      this.context.clearRect(0, 0, size.width, size.height);
    }
  }
}
