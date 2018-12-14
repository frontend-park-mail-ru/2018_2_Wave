import EnemyModel from './enemyModel';

export default class EnemiesModel {
  constructor() {
    this.enemySnakes = [];
  }

  push(snake) {
    this.enemySnakes.push(snake);
  }

  setState(snakes) {
    this.enemySnakes = [];
    this.segments  = [];
    if (snakes) {
      snakes.forEach((snake) => {
        if (snake.user_token !== this.userToken) {
          const enemy = new EnemyModel();
          enemy.setState(snake);
          this.push(enemy);
        }
      });
    }
  }
}
