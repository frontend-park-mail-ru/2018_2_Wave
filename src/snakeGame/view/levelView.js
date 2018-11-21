import Position from '../model/position';

export default class LevelView {
  constructor(levelModel) {
    this.levelModel = levelModel;
  }

  render(canvas) {
    let x;
    let y;
    let cx;
    let cy;

    canvas.setBlackBackground(this.levelModel.size.width,
      this.levelModel.size.height);

    for (x = 0; x < this.levelModel.getWidth(); x += 1) {
      for (y = 0; y < this.levelModel.getHeight(); y += 1) {
        const type = this.levelModel.getField(new Position(x, y));
        cx = x;
        cy = y;

        let color;
        let stroke;
        switch (type) {
          case 1:
            color = '#99ff00';
            stroke = '#00ff00';
            break;

          case 2:
            color = '#330000';
            stroke = '#ff0000';
            break;
          default:
            break;
        }

        const size = 30;

        if (color) {
          canvas.drawLetter({
            fillStyle: color,
            font: 'Arial',
            stroke,
            size,
            letter: '*',
            x: cx,
            y: cy + size / 2 * 1.5,
          });
        }
      }
    }
  }
}
