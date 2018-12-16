import Size from '../models/size';
import config from './game_config';

export default class Canvas {
  constructor(canvas, cellSize, orientation) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.cellSize = cellSize;
    this.orientation = orientation;
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

    this.size = size;
    if (this.orientation === config.HORIZONTAL) {
      this.canvas.width = size.width;
      this.canvas.height = size.height;
    } else {
      this.canvas.width = size.height;
      this.canvas.height = size.width;
    }
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

  drawRect({
    fillStyle = '#000000',
    strokeStyle = '#009900',
    lineWidth = 1,
    lineCap = 'square',
    x,
    y,
    width = 1,
    height = 1,
    space = 4,
  }) {
    this.context.fillStyle = fillStyle;
    this.context.strokeStyle = strokeStyle;
    this.context.lineWidth = lineWidth;
    // Sets square style of the end caps for a line

    this.context.lineCap = lineCap;
    this.context.beginPath();
    if (this.orientation === config.HORIZONTAL) {
      this.context.rect(x * this.cellSize.width + space, y * this.cellSize.height + space,
        width * this.cellSize.width - space, height * this.cellSize.height - space);
    } else {
      this.context.rect(y * this.cellSize.height + space, x * this.cellSize.width + space,
        height * this.cellSize.height - space, width * this.cellSize.width - space);
    }
    this.context.fill();
    this.context.stroke();
    this.context.closePath();
  }

  setBlackBackground(width, height) {
    this.context.clearRect(0, 0,
      this.canvas.width * this.cellSize.width, this.canvas.height * this.cellSize.height);
  }
}
