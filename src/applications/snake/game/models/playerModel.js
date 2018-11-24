import busController from '../../modules/busController';

export default class Player {
  constructor() {
    this.score = 0;
    this.isDead = false;
  }

  setSnake(snake) {
    this.snake = snake;
  }

  setDead() {
    busController.removeBusListeners(this.events);
    this.isDead = true;
  }
}
