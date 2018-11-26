import Position from '../models/position';

export default class LevelView {
  constructor(levelModel) {
    this.levelModel = levelModel;
    this.letters = false;
  }

  render(canvas) {
    let x,
      y,
      cx,
      cy;

    canvas.setBlackBackground(this.levelModel.size.width,
      this.levelModel.size.height);

    for (x = 0; x < this.levelModel.size.width; x += 1) {
      for (y = 0; y < this.levelModel.size.height; y += 1) {
        const type = this.levelModel.getField(new Position(x, y));
        cx = x;
        cy = y;

        let color, strokeStyle;
        switch (type) {
          case 1:
            color = '#330000';
            strokeStyle = '#ff0000';
            break;

          case 2:
            color = '#330000';
            strokeStyle = '#ff0000';
            break;
          default:
            break;
        }

        const size = 30;
        if (color) {
          if (this.letters) {
            canvas.drawLetter({
              fillStyle: color,
              font: 'Arial',
              strokeStyle,
              size,
              letter: '*',
              x: cx,
              y: cy + size / 2 * 1.5,
            });
          } else {
            canvas.drawRect({
              fillStyle: color,
              strokeStyle,
              x: cx,
              y: cy,
            });
          }
        }
      }
    }
  }
}
