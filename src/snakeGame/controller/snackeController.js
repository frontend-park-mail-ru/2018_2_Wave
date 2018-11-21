import Position from '../model/position';
import busController from '../../modules/busController';

export default class SnakeController {
  constructor(snake, level) {
    this.level = level;
    this.snake = snake;
    this.busController = busController;
    this.directions = {
      UP: 'UP',
      DOWN: 'DOWN',
      LEFT: 'LEFT',
      RIGHT: 'RIGHT',
    };

    this.keyboardDirections = {
      ArrowUp: 'UP',
      ArrowDown: 'DOWN',
      ArrowLeft: 'LEFT',
      ArrowRight: 'RIGHT',
    };

    this.events = {
      food: this.snakeAppendLetter.bind(this),
    };
  }


  setEventListeners() {
    this.busController.setBusListeners(this.eventsMethods);
  }

  setDirection(keyboardDirection) {
    this.snake.setDirection(this.keyboardDirections[keyboardDirection]);
  }

  init() {
    const snakeText = this.snake.getSnakeText();
    for (let i = 0; i < snakeText.length; i += 1) {
      this.snake.unshiftSegment({
        x: this.snake.getStartPosition().x + i,
        y: this.snake.getStartPosition().y,
        letter: snakeText[i],
      });
    }
    console.log('head init', this.snake.getSegments()[0]);
  }

  findEmptyPlace() {
    while (true) {
      const rec = this.level.emptyCell();
      if (this.level.getField(rec.x + 1, rec.y) === 0
            && this.level.getField(rec.x + 2, rec.y) === 0) {
        this.snake.segments[0] = new Position(rec.x, rec.y);
        this.snake.segments[1].x = new Position(rec.x + 1, rec.y);
        break;
      }
    }
  }

  isColisionWithFood(position) {
    const isFood = this.level.isFood(position);
    return isFood;
  }

  snakeAppendLetter(letter, position) {
    busController.removeBusListeners(this.events);
    this.snake.segments.unshift({
      x: position.x,
      y: position.y,
      letter,
    });
  }


  move() {
    const [head] = this.snake.segments;
    let newX = head.x;
    let newY = head.y;

    if (this.snake.direction === this.directions.RIGHT) {
      newX += 1;
    } else if (this.snake.direction === this.directions.LEFT) {
      newX -= 1;
    } else if (this.snake.direction === this.directions.DOWN) {
      newY += 1;
    } else if (this.snake.direction === this.directions.UP) {
      newY -= 1;
    }


    // wrap around the world, x-axis first
    if (newX >= this.level.getWidth()) {
      newX = 0;
    } else if (newX < 0) {
      newX = this.level.getWidth() - 1;
    }

    // y-axis
    if (newY >= this.level.getHeight()) {
      newY = 0;
    } else if (newY < 0) {
      newY = this.level.getHeight() - 1;
    }

    const position = new Position(newX, newY);
    if (this.isColisionWithFood(position)) {
      busController.setBusListeners(this.events);
      busController.emit('pickFood', position);
    } else {
      this.snake.segments.unshift({
        x: newX,
        y: newY,
        letter: 'tempValue',
      });

      let temp = 'tempValue';

      const segments = this.snake.getSegments();
      for (let i = segments.length - 1; i >= 0; i -= 1) {
        const { letter } = segments[i];
        segments[i].letter = temp;
        temp = letter;
      }

      this.snake.popSegment();
    }


    /*
    if (!this.isColisionWithFood(position)) {
      this.snake.popSegment();
    }
    this.snake.segments.unshift(position);
    */
  }

  update() {
    this.move();
  }
}
