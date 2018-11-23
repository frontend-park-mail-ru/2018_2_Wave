export default class SnakeView {
  constructor(snake) {
    this.snake = snake;
  }

  render(canvas) {
    const font = 'Arial';
    const size = 15;
    const fillStyle = '#99ff00';

    this.snake.getSegments().forEach((segment) => {
      if (this.snake.letters) {
        canvas.drawLetter({
          font,
          size,
          fillStyle,
          x: segment.x,
          y: segment.y,
          letter: segment.letter,
        });
      } else {
        canvas.drawRect({
          fillStyle: '#003300',
          strokeStyle: '#009900',
          x: segment.x,
          y: segment.y,
          width: 1,
          height: 1,
        });
      }
    });
  }
}
