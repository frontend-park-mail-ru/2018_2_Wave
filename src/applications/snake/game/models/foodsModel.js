export default class FoodsModel {
  constructor(foodCount) {
    this.foodCount = foodCount;
    this.foods = [];
    return this;
  }

  push(food) {
    this.foods.push(food);
  }
}
