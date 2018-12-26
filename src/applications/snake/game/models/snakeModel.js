import globalUser from '../../globalUser';
import PlayersModel from './playersModel';

export default class SnakeModel {
  constructor() {
    this.segments  = [];
    this.userToken = globalUser.userToken;
    this.defaultSize = 3;
    this.playerId = 2;
    this.startPosition = {
      x: 15,
      y: 20,
    };

    this.directions = {
      Up: 'UP',
      DOWN: 'DOWN',
      LEFT: 'LEFT',
      RIGHT: 'RIGHT',
    };

    this.directionsOposit = {
      UP: 'DOWN',
      DOWN: 'UP',
      LEFT: 'RIGHT',
      RIGHT: 'LEFT',
    };

    this.direction = this.directions.RIGHT;
    this.prevDirection = this.direction;
    this.playersModel = new PlayersModel();
    this.destroyed = false;
  }

  init({
    segments = [],
    startPosition,
    destroyed,
  }) {
    this.segments = segments;
    this.startPosition = startPosition;
    this.destroyed = destroyed;
  }

  getSegments() {
    return this.segments;
  }

  popSegment() {
    this.segments.pop();
  }

  pushSegment(segment) {
    this.segments.push(segment);
  }

  unshiftSegment(segment) {
    this.segments.unshift(segment);
  }

  setDirection(direction) {
    this.prevDirection = this.direction;
    this.direction = direction;
  }

  getStartPosition() {
    return this.startPosition;
  }

  getSnakeText() {
    return this.snakeText;
  }

  isReverse() {
    return this.direction === this.directionsOposit[this.prevDirection];
  }

  turnAround() {
    this.direction.reverse();
  }

  getDirection() {
    return this.direction;
  }

  setState(snakes) {
    this.segments  = [];
    if (snakes) {
      snakes.forEach((snake) => {
        if (snake.user_token === this.userToken) {
          this.playersModel.setState(snake.user_serial, snake.score);
          this.score = snake.score;
          snake.body.forEach((segment) => {
            this.segments.push({
              x: segment.position.x,
              y: segment.position.y,
            });
          });
        }
      });
    }
  }
}
