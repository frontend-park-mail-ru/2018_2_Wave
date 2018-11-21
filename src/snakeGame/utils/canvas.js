import Size from '../model/size';

export default class Canvas {
  constructor(root, cellSize) {
    [this.canvas] = root.getElementsByClassName('canvas');
    this.context = this.canvas.getContext('2d');
    this.cellSize = cellSize;
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

  drawLetter({
    font = 'Arial',
    fillStyle = '#99ff00',
    stroke = undefined,
    size = 15,
    x = 10 * this.cellSize.width,
    y = 10 * this.cellSize.height,
    letter = 'a',
  }) {
    this.context.beginPath();
    this.context.font = `${size}px ${font}`;
    this.context.fillStyle = fillStyle;
    this.context.strokeStyle = stroke;
    this.context.fillText(
      letter,
      x * this.cellSize.width,
      y * this.cellSize.height,
    );
    this.context.stroke();
    this.context.closePath();
  }

  setBlackBackground(width, height) {
    // set black cackground color
    this.context.fillStyle = '#000000';
    this.context.lineWidth = 1;
    // Sets square style of the end caps for a line

    this.context.lineCap = 'square';
    this.context.fillRect(
      0,
      0,
      width * this.cellSize.width,
      height * this.cellSize.height,
    );
  }
}
