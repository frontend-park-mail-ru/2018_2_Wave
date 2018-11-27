export default class FoodsModel {
  constructor(foodCount) {
    this.count = foodCount;
    this.foods = [];
    return this;
  }

  push(food) {
    this.foods.push(food);
  }
}
