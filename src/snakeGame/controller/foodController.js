import busController from '../../modules/busController';

export default class FoodController {
  constructor(foodModel, levelModel) {
    this.foodModel = foodModel;
    this.levelModel = levelModel;
    this.busController = busController;
    this.foodModel.position = this.levelModel.getEmptyCell();

    this.busController.emit('setFood', this.foodModel.position);

    this.eventsMethosds = {
      resetFood: this.resetFood.bind(this),
    };

    this.busController.setBusListeners(this.eventsMethosds);
  }

  resetFood(position) {
    this.busController.emit('setFood', position);
    this.foodModel.setFoodPosition(position);
    this.foodModel.resetBirth();
  }

  update() {
    if ((Date.now() - this.foodModel.birth) >= this.foodModel.life) {
      this.resetFood(this.levelModel.getEmptyCell());
    }
  }
}
