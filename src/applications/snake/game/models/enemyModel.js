export default class EnemyModel {
  constructor(userToken) {
    this.userToken = userToken;
    this.segments = [];
  }

  setState(snakes) {
    this.segments  = [];
    snakes.forEach((snake) => {
      if (snake.user_id !== this.userToken) {
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
