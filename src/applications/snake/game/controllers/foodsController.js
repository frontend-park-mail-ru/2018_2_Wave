import FoodModel from '../models/foodModel';
import FoodController from './foodController';

export default class FoodsController {
  constructor(foods, level) {
    this.foods = foods;
    this.foodsCount = this.foods.count;
    this.level = level;
    this.foodsController = [];
    for (let i = 0; i < this.foodsCount; i += 1) {
      const food = new FoodModel();
      this.foodsController.push(new FoodController(food, this.level));
      this.foods.push(food);
    }
  }

  init() {
    this.foodsController.forEach(foodController => foodController.init());
  }

  update() {
    this.foodsController.forEach(foodController => foodController.update());
  }
}
