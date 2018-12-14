import config from '../../modules/view_config';

export default class EnemiesView {
  constructor(enemies) {
    this.enemies = enemies;
  }

  render(canvas) {
    if (this.enemies.enemySnakes) {
      this.enemies.enemySnakes.forEach((snake) => {
        const fillStyle = config.enemiesColors[snake.user_serial];
        const strokeStyle = config.enemiesColors[snake.user_serial];
        snake.segments.forEach((segment) => {
          canvas.drawRect({
            fillStyle,
            strokeStyle,
            x: segment.x,
            y: segment.y,
            width: 1,
            height: 1,
          });
        });
      });
    }
  }
}
