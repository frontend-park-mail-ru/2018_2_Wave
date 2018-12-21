import FoodView from './foodView';

export default class FoodsView {
  constructor(foods, color) {
    this.foods = foods;
    this.letters = false;
    this.foodView = new FoodView();
    this.color = color;
  }

  render(canvas) {
    if (this.color) {
      this.foods.foods.forEach(food => this.foodView.render(canvas, food, this.color));
    } else {
      this.foods.foods.forEach(food => this.foodView.render(canvas, food));
    }
  }
}
