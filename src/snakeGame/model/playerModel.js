import Score from './scoreModel';

export default class Player {
  constructor() {
    this.score = new Score();
  }

  setSnake(snake) {
    this.snake = snake;
  }
}
