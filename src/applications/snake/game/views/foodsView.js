import FoodView from './foodView';

export default class FoodsView {
  constructor(foods) {
    this.foods = foods;
    this.letters = false;
    this.foodView = new FoodView();
  }

  render(canvas) {
    this.foods.foods.forEach(food => this.foodView.render(canvas, food));
  }
}
