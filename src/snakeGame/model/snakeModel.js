import Position from './position';

export default class SnakeModel {
  constructor(position) {
    this.segments  = [new Position(position.x + 1, position.y), position];

    this.directions = {
      Up: 'UP',
      DOWN: 'DOWN',
      LEFT: 'LEFT',
      RIGHT: 'RIGHT',
    };

    this.directionsOposit = {
      UP: 'DOWN',
      DOWN: 'UP',
      Left: 'RIGHT',
      RIGHT: 'RIGHT',
    };

    this.direction = this.directions.DOWN;

    this.destroyed = false;
    this.score     = 0;
  }

  popSegment() {
    this.segments.pop();
  }

  setDirection(direction) {
    this.direction = direction;
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
