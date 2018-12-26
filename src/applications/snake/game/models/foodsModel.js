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
    if (foods) {
      foods.forEach((apple) => {
        const newFood = new FoodModel();
        newFood.setPosition(new Position(apple.position.x, apple.position.y));
        this.push(newFood);
      });
    }
  }
}
