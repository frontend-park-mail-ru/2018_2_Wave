import Position from '../model/position';

export default class LevelView {
  constructor(levelModel, canvas) {
    this.context  = canvas.getContext();
    this.levelModel = levelModel;
  }

  render() {
    let x;
    let y;
    let cx;
    let cy;

    // set black cackground clor
    this.context.fillStyle = '#000000';
    this.context.lineWidth = 1;
    // Sets square style of the end caps for a line
    this.context.lineCap = 'square';
    this.context.fillRect(0, 0, this.levelModel.getWidth() * this.levelModel.getCellSize(),
      this.levelModel.getHeight() * this.levelModel.getCellSize());

    // grid
    /*
    for (x = 0; x < this.levelModel.getWidth(); x += 1) {
      for (y = 0; y < this.levelModel.getHeight(); y += 1) {
        cx = (x * this.levelModel.getCellSize()) + 0.5;
        cy = (y * this.levelModel.getCellSize()) + 0.5;

        this.context.strokeStyle = '#111111';
        // this.context.strokeStyle = '#ffffff';
        this.context.beginPath();
        this.context.rect(cx, cy, this.levelModel.getCellSize(), this.levelModel.getCellSize());
        this.context.stroke();
        this.context.closePath();
      }
    }
    */

    /*
    const cellSize = this.levelModel.getCellSize();
    const radius = 1;
    for (x = 0; x < this.levelModel.getWidth(); x += 1) {
      for (y = 0; y < this.levelModel.getHeight(); y += 1) {
        cx = (x * cellSize) + cellSize / 2;
        cy = (y * cellSize) + cellSize / 2;

        this.context.strokeStyle = '#ffffff';
        // this.context.strokeStyle = '#ffffff';
        this.context.beginPath();
        this.context.arc(cx, cy, radius, 0, 2 * Math.PI);
        this.context.stroke();
        this.context.closePath();
      }
    }
    */

    // obstacles
    /*
    for (x = 0; x < this.levelModel.getWidth(); x += 1) {
      for (y = 0; y < this.levelModel.getHeight(); y += 1) {
        const type = this.levelModel.getField(new Position(x, y));
        cx = (x * this.levelModel.getCellSize()) + 0.5;
        cy = (y * this.levelModel.getCellSize()) + 0.5;

        let color;
        let stroke;
        switch (type) {
          case 1:
            color = '#003300';
            stroke = '#00ff00';
            break;

          case 2:
            color = '#330000';
            stroke = '#ff0000';
            break;
          default:
            break;
        }

        if (color) {
          this.context.strokeStyle = stroke;
          this.context.fillStyle = color;
          this.context.beginPath();
          this.context.rect(cx, cy, this.levelModel.getCellSize(), this.levelModel.getCellSize());
          this.context.fill();
          this.context.stroke();
          this.context.closePath();
        }
      }
    }

    */
    const cellSize = this.levelModel.getCellSize();
    for (x = 0; x < this.levelModel.getWidth(); x += 1) {
      for (y = 0; y < this.levelModel.getHeight(); y += 1) {
        const type = this.levelModel.getField(new Position(x, y));
        cx = x * cellSize;
        cy = y * cellSize;

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
          this.context.strokeStyle = stroke;
          this.context.fillStyle = color;
          this.context.beginPath();
          this.context.font = `${size}px Arial`;
          this.context.fillText('*', cx, cy + size / 2 * 1.5);
          this.context.stroke();
          this.context.closePath();
        }
      }
    }
  }
}
