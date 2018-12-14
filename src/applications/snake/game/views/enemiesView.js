import config from '../../modules/view_config';

export default class EnemiesView {
  constructor(enemies) {
    this.enemies = enemies;
  }

  render(canvas) {
    this.enemies.snakes.forEach((snake) => {
      snake.segments.forEach((segment) => {
        canvas.drawRect({
          fillStyle: '#cc0000',
          strokeStyle: '#fc7874',
          x: segment.x,
          y: segment.y,
          width: 1,
          height: 1,
        });
      });
    });
  }
}
