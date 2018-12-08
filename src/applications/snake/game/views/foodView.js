export default class FoodView {
  constructor(foodModel) {
    this.foodModel = foodModel;
  }

  render(canvas, foodModel) {
    if (foodModel) {
      this.foodModel = foodModel;
    }

    const fillStyle = '#FE00DD';
    const strokeStyle = '#FE00DD';

    if (this.foodModel.position) {
      canvas.drawRect({
        fillStyle,
        strokeStyle,
        x: this.foodModel.position.x,
        y: this.foodModel.position.y,
        width: 1,
        height: 1,
      });
    }
  }
}
