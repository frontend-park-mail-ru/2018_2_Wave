export default class SnakeView {
  constructor(snakeModel, canvas) {
    this.context = canvas.getContext();
    this.snakeModel = snakeModel;
  }

  render() {
    // TODO mpve tocanvas
    this.context.font = '15px Arial';
    this.context.fillStyle = '#99ff00';

    this.snakeModel.getSegments().forEach((segment) => {
      this.context.fillText(
        segment.letter,
        segment.x,
        segment.y,
      );
    });
  }
}
