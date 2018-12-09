import config from './view_config';

export default class SnakeView {
  constructor(snake) {
    this.snake = snake;
  }

  render(canvas) {
    const fillStyle = config.snakeCollor;
    const strokeStyle = config.snakeCollor;
    // console.log(this.snake.segments);
    if (this.snake.segments) {
      this.snake.getSegments().forEach((segment) => {
        canvas.drawRect({
          fillStyle,
          strokeStyle,
          x: segment.x,
          y: segment.y,
          width: 1,
          height: 1,
        });
      });
    }
  }
}
