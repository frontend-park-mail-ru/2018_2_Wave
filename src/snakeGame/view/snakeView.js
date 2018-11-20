export default class SnakeView {
  constructor(snakeModel) {
    this.snakeModel = snakeModel;
  }

  render(canvas) {
    const font = 'Arial';
    const size = 15;
    const fillStyle = '#99ff00';

    this.snakeModel.getSegments().forEach((segment) => {
      canvas.drawLetter({
        font,
        size,
        fillStyle,
        x: segment.x,
        y: segment.y,
        letter: segment.letter,
      });
    });
  }
}
