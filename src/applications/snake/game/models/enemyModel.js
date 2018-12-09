import globalUser from '../../globalUser';

export default class EnemyModel {
  constructor() {
    this.userToken = globalUser.userToken;
    this.segments = [];
  }

  setState(snakes) {
    this.segments  = [];
    if (snakes) {
      snakes.forEach((snake) => {
        if (snake.user_id !== this.userToken) {
          snake.body.forEach((segment) => {
            this.segments.push({
              x: segment.position.X,
              y: segment.position.Y,
            });
          });
        }
      });
    }
  }
}
