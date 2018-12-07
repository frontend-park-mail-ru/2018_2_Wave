import Position from '../models/position';

export default class LevelView {
  constructor(levelModel) {
    this.levelModel = levelModel;
    this.letters = false;
  }

  render(canvas) {
    canvas.setBlackBackground(this.levelModel.size.width,
      this.levelModel.size.height);

    this.levelModel.walls.forEach((wall) => {
      // rer and black
      // const color = '#330000';
      // const strokeStyle = '#ff0000';

      const fillStyle = '#000761';
      const strokeStyle = '#000761';
      const size  = 1;

      if (this.letters) {
        canvas.drawLetter({
          fillStyle,
          font: 'Arial',
          strokeStyle,
          size,
          letter: '*',
          x: wall.x,
          y: wall.y + size / 2 * 1.5,
        });
      } else {
        canvas.drawRect({
          fillStyle,
          strokeStyle,
          x: wall.x,
          y: wall.y,
        });
      }
    });
  }
}
