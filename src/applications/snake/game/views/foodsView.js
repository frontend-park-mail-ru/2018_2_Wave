import FoodView from './foodView';

export default class FoodsView {
  constructor(foods) {
    this.foods = foods;
    this.letters = false;
    this.foodsView = [];

    foods.foods.forEach(food => this.foodsView.push(new FoodView(food)));
  }


  render(canvas) {
    this.foodsView.forEach(foodView => foodView.render(canvas));
  }
}
