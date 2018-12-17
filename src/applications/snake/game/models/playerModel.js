export default class Player {
  constructor(userToken) {
    this.score = 0;
    this.isDead = false;
    this.userToken = userToken;
  }

  setSnake(snake) {
    this.snake = snake;
  }

  setDead() {
    this.isDead = true;
  }

  addToScore() {
    this.score += 1;
  }
}
