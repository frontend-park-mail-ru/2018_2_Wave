import Position from '../model/position';
import busController from '../utils/busController';

export default class SnakeController {
  constructor(snakeModel, levelModel) {
    this.levelModel = levelModel;
    this.snakeModel = snakeModel;
    this.busController = busController;
    this.directions = {
      UP: 'UP',
      DOWN: 'DOWN',
      LEFT: 'LEFT',
      RIGHT: 'RIGHT',
    };

    this.eventsMethods = {
      ArrowUp: _ => this.setDirection(this.directions.UP),
      ArrowDown: _ => this.setDirection(this.directions.DOWN),
      ArrowLeft: _ => this.setDirection(this.directions.LEFT),
      ArrowRight: _ =>  this.setDirection(this.directions.RIGHT),
    };

    this.setEventListeners();
  }


  setEventListeners() {
    this.busController.setBusListeners(this.eventsMethods);
  }

  setDirection(direction) {
    /*
    if (this.snakeModel.isOpositDirection(direction)) {
      this.snakeModel.turnAround();
    }
    */
    this.snakeModel.setDirection(direction);
  }

  findEmptyPlace() {
    while (true) {
      const rec = this.levelModel.emptyCell();
      if (this.levelModel.getField(rec.x + 1, rec.y) === 0
            && this.levelModel.getField(rec.x + 2, rec.y) === 0) {
        this.snakeModel.segments[0] = new Position(rec.x, rec.y);
        this.snakeModel.segments[1].x = new Position(rec.x + 1, rec.y);
        break;
      }
    }
  }

  isColisionWithFood(position) {
    const isFood = this.levelModel.isFood(position);
    if (isFood) {
      busController.emit('pickFood', position, this.segments);
    }
    return isFood;
  }

  move() {
    const [head] = this.snakeModel.segments;
    let newX = head.x;
    let newY = head.y;

    if (this.snakeModel.direction === this.directions.RIGHT) {
      newX += 1;
    } else if (this.snakeModel.direction === this.directions.LEFT) {
      newX -= 1;
    } else if (this.snakeModel.direction === this.directions.DOWN) {
      newY += 1;
    } else if (this.snakeModel.direction === this.directions.UP) {
      newY -= 1;
    }

    // wrap around the world, x-axis first
    if (newX >= this.levelModel.getWidth()) {
      newX = 0;
    } else if (newX < 0) {
      newX = (this.levelModel.getWidth() - 1);
    }


    // y-axis
    if (newY >= this.levelModel.getHeight()) {
      newY = 0;
    } else if (newY < 0) {
      newY = (this.levelModel.getHeight() - 1);
    }

    const position = new Position(newX, newY);

    if (!this.isColisionWithFood(position)) {
      this.snakeModel.popSegment();
    }
    // place the new element at the front of the array
    this.snakeModel.segments.unshift(position);
  }

  update() {
    this.move();
  }
}
