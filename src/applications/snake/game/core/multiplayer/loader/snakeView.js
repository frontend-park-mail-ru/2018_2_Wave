import config from '../../../../modules/view_config';

export default class SnakeView {
  constructor(snake, context, loaderInfo) {
    this.snake = snake;
    this.context = context;
    this.loaderInfo = loaderInfo;
    // this.loaderInfo.cellSize.height = 8;
    // this.loaderInfo.cellSize.width = 8;
  }

  render() {
    this.context.fillStyle = config.snakeColor;
    this.context.strokeStyle = config.snakeColor;
    this.context.lineWidth = 1;
    const size = 2;

    if (this.snake.segments) {
      this.snake.getSegments().forEach((segment) => {
        this.context.beginPath();
        this.context.rect(segment.x * this.loaderInfo.cellSize.width,
          segment.y * this.loaderInfo.cellSize.height,
          this.loaderInfo.cellSize.width + size, this.loaderInfo.cellSize.height + size);
        this.context.fill();
        this.context.stroke();
        this.context.closePath();
      });
    }
  }
}
