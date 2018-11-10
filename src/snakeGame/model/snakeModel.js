import Position from './position';

export default class SnakeModel {
  constructor(snakeText, startX, startY) {
    this.segments  = [];
    this.snakeText = snakeText;
    this.startPosition = new Position(startX, startY);

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
      RIGHT: 'RIGHT',
    };

    this.direction = this.directions.RIGHT;

    this.destroyed = false;
    this.score     = 0;
  }

  getSegments() {
    return this.segments;
  }

  popSegment() {
    this.segments.pop();
  }

  pushSegment(segment) {
    console.log(segment);
    this.segments.push(segment);
  }

  unshiftSegment(segment) {
    console.log('unshift segment', segment);
    this.segments.unshift(segment);
  }

  setDirection(direction) {
    this.direction = direction;
  }

  getStartPosition() {
    return this.startPosition;
  }

  getSnakeText() {
    return this.snakeText;
  }

  isOpositDirection(direction) {
    return direction === this.directionsOposit[this.direction];
  }

  turnAround() {
    this.direction.reverse();
  }

  getDirection() {
    return this.direction;
  }
}
