import Position from '../model/position';
import busController from '../../modules/busController';

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
    this.initSnake();
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

  initSnake() {
    console.log('init1', this.snakeModel.getSegments());
    const snakeText = this.snakeModel.getSnakeText();
    for (let i = 0; i < snakeText.length; i += 1) {
      console.log('init snake', this.snakeModel.getStartPosition().x + i,
                                this.snakeModel.getStartPosition().y,
                                snakeText[i]);
      this.snakeModel.unshiftSegment({
        x: this.snakeModel.getStartPosition().x + i,
        y: this.snakeModel.getStartPosition().y,
        letter: snakeText[i],
      });
    }
    console.log('init', this.snakeModel.getSegments());
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
    // console.log('position', position);
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


    /*
    // wrap around the world, x-axis first
    if (newX >= this.levelModel.getWidth() * this.levelModel.getCellSize().getWidth()) {
      newX = 0;
    } else if (newX < 0) {
      newX = (this.levelModel.getWidth() * this.levelModel.getCellSize().getWidth() - 1);
    }


    // y-axis
    if (newY >= this.levelModel.getHeight() * this.levelModel.getCellSize().getHight()) {
      newY = 0;
    } else if (newY < 0) {
      newY = (this.levelModel.getHeight() * this.levelModel.getCellSize().getHight() - 1);
    }
    */

    if (this.isColisionWithFood(new Position(newX, newY))) {
      console.log('collision');
    }

    this.snakeModel.segments.unshift({
      x: newX,
      y: newY,
      letter: 'tempValue',
    });

    let temp = 'tempValue';

    console.log(this.snakeModel.getSegments());

    const segments = this.snakeModel.getSegments();
    for (let i = segments.length - 1; i >= 0; i -= 1) {
      const letter = segments[i].letter;
      segments[i].letter = temp;
      temp = letter;
    }

    this.snakeModel.popSegment();


    // console.log(this.snakeModel.getSegments());

    /*
    const position = new Position(newX, newY);

    if (!this.isColisionWithFood(position)) {
      this.snakeModel.popSegment();
    }
    // place the new element at the front of the array
    this.snakeModel.segments.unshift(position);
    */
  }

  update() {
    this.move();
  }
}
