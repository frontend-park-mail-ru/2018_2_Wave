import busController from '../../modules/busController';

export default class FoodController {
  constructor(food, level) {
    this.food = food;
    this.level = level;
    this.busController = busController;

    busController.setBusListeners({
      pickFood: this.setNewPlace.bind(this),
    });
  }

  init() {
    this.food.init({});
    this.setNewPlace();
    console.log('init food', this.food.getPosition());
  }

  setNewPlace() {
    busController.emit('food', this.food.getLetter(), this.food.getPosition());
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
