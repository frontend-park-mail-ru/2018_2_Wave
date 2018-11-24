import FoodModel from '../models/foodModel';

export default class FoodsController {
  constructor(foods, foodsCount) {
    this.foods = foods;
    this.foodsCount = foodsCount;
  }

  /*
  init() {
    for (let i = 0; i < this.foodsCount; i += 1) {
      this.foods.push(new FoodModel().init().);
    }
  }
  */
}
