import busController from '../../modules/busController';

export default class FoodController {
  constructor(food, level) {
    this.food = food;
    this.level = level;
    this.busController = busController;
  }

  init() {
    this.food.init({});
    this.setNewPlace();
    console.log('init food', this.food.getPosition());
  }

  setNewPlace() {
    const emptyCell = this.level.getEmptyCell();
    this.food.setPosition(emptyCell);
    this.level.setFood(emptyCell);
    this.food.resetBirth();
    console.log('new food place', emptyCell);
  }

  update() {
    if ((Date.now() - this.food.birth) >= this.food.life) {
      this.setNewPlace();
    }
  }
}
