export default class SnakeView {
  constructor(snakeModel, levelModel, canvas) {
    this.context = canvas.getContext();
    this.snakeModel = snakeModel;
    this.levelModel = levelModel;
  }

  render() {
    this.context.font = '15px Arial';
    this.context.fillStyle = '#99ff00';

    this.snakeModel.getSegments().forEach((segment) => {
      this.context.fillText(
        segment.letter,
        segment.x * this.levelModel.cellWidth,
        segment.y * this.levelModel.cellHeight,
      );
    });
  }
}
