import EnemyModel from './enemyModel';
import PlayersModel from './playersModel';

export default class EnemiesModel {
  constructor(player) {
    this.enemySnakes = [];
    this.players = new PlayersModel();
    this.player = player;
  }

  push(snake) {
    this.enemySnakes.push(snake);
  }

  setState(snakes) {
    this.enemySnakes = [];
    this.segments  = [];
    if (snakes) {
      snakes.forEach((snake) => {
        const enemy = new EnemyModel();
        enemy.setState(snake);
        this.push(enemy);
        this.players.setState(snake.user_serial, snake.score);
        if (snake.user_token === this.player.userToken) {
          this.player.score = snake.score;
        }
      });
    }
  }
}
