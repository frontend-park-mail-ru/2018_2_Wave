export default class EnemyView {
  constructor(enemies) {
    this.enemies = enemies;
  }

  render(canvas) {
    this.enemies.segments.forEach((segment) => {
      canvas.drawRect({
        fillStyle: '#cc0000',
        strokeStyle: '#fc7874',
        x: segment.x,
        y: segment.y,
        width: 1,
        height: 1,
      });
    });
  }
}
