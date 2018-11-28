import FoodModel from './foodModel';
import Position from './position';

export default class FoodsModel {
  constructor(foodCount) {
    this.count = foodCount;
    this.foods = [];
    return this;
  }

  push(food) {
    this.foods.push(food);
  }

  setState(foods) {
    this.foods = [];
    foods.forEach((apple) => {
      const newFood = new FoodModel();
      newFood.setPosition(new Position(apple.position.X, apple.position.Y))
      this.push(newFood);
    });
  }
}
