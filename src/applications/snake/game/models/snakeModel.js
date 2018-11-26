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
      RIGHT: 'LEFT',
    };

    this.direction = this.directions.RIGHT;
    this.prevDirection = this.direction;
    this.destroyed = false;
  }

  init({
    segments = [],
    snakeText,
    startPosition,
    destroyed,
  }) {
    this.segments = segments;
    this.snakeText = snakeText;
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
}
