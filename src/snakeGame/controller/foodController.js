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
  }

  setNewPlace() {
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
