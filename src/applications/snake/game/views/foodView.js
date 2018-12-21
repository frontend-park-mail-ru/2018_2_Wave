import config from '../../modules/view_config';

export default class FoodView {
  constructor(foodModel) {
    this.foodModel = foodModel;
  }

  render(canvas, foodModel, color) {
    if (foodModel) {
      this.foodModel = foodModel;
    }

    let fillStyle;
    if (color) {
      fillStyle = color;
    } else {
      fillStyle = config.foodColor;
    }
 
    const strokeStyle = config.foodColor;

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
