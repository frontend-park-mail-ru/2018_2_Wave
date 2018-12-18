export default class EnemyModel {
  constructor() {
    this.segments = [];
  }

  setState(snake) {
    this.user_serial = snake.user_serial;
    snake.body.forEach((segment) => {
      this.segments.push({
        x: segment.position.x,
        y: segment.position.y,
      });
    });
  }
}
