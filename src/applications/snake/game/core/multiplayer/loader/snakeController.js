export default class SnakeController {
  constructor(snake, loaderParams) {
    this.snake = snake;
    this.loaderParams = loaderParams;
    this.lenght = 5;

    this.directions = {
      UP: 'UP',
      DOWN: 'DOWN',
      LEFT: 'LEFT',
      RIGHT: 'RIGHT',
    };
  }

  init() {
    const x = Math.floor(Math.random() * this.loaderParams.widthCellCount);
    const y = Math.floor(Math.random() * this.loaderParams.heightCellCount);

    for (let i = 0; i < this.lenght; i += 1) {
      this.snake.unshiftSegment({ x: x + i, y });
    }
  }

  move() {
    const [head] = this.snake.segments;
    let newX = head.x;
    let newY = head.y;

    switch (Math.floor(1 + (Date.now() + Math.random() * 1000) % 4)) {
      case 1:
        if (newX < this.loaderParams.widthCellCount) {
          newX += 1;
          break;
        }
      case 2:
        if (newX > 1) {
          newX -= 1;
          break;
        }
      case 3:
        if (newY < this.loaderParams.heightCellCount) {
          newY += 1;
          break;
        }
      case 2:
        if (newY > 1) {
          newY -= 1;
          break;
        }
      default:
        break;
    }

    this.snake.unshiftSegment({ x: newX, y: newY });
    this.snake.popSegment();
  }

  update() {
    this.move();
  }
}
