import busController from '../../modules/busController';

export default class FoodController {
  constructor(food, level) {
    this.food = food;
    this.level = level;
    this.busController = busController;

    busController.setBusListeners({
      pickFood: this.pickFood.bind(this),
    });
  }

  init() {
    this.food.init({ life: Math.floor(Math.random() * 10000) });
    this.setNewPlace();
  }

  pickFood(position) {
    if (position && position.x === this.food.getX() && position.y === this.food.getY()) {
      this.setNewPlace(position);
    }
  }

  setNewPlace() {
    busController.emit('food', this.food.getLetter(), this.food.getPosition());
    if (this.food.position) {
      this.level.removeFood(this.food.position);
    }
    const emptyCell = this.level.getEmptyCell();
    this.food.setPosition(emptyCell);
    this.level.setFood(emptyCell);
    this.food.resetBirth();
  }

  update() {
    if ((Date.now() - this.food.birth) >= this.food.life) {
      this.setNewPlace();
    }
  }
}
