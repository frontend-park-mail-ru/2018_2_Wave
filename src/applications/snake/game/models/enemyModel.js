export default class EnemyModel {
  constructor(userId) {
    this.userId = userId;
    this.segments = [];
  }

  setState(snakes) {
    this.segments  = [];
    snakes.forEach((snake) => {
      if (snake.user_id !== this.userId) {
        snake.body.forEach((segment) => {
          this.segments.push({
            x: segment.position.X,
            y: segment.position.Y,
            letter: segment.letter,
          });
        });
      }
    });
  }
}
