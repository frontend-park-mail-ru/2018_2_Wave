export default class Player {
  constructor() {
    this.score = 0;
    this.isDead = false;
  }

  setSnake(snake) {
    this.snake = snake;
  }

  setDead() {
    this.isDead = true;
  }

  addToScore(value = 1) {
    this.score += value;
  }
}
