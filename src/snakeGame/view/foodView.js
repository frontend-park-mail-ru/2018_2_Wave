export default class FoodView {
  constructor(foodModel) {
    this.foodModel = foodModel;
  }

  render(canvas) {
    canvas.darwLetter({
      font: 'Arial',
      size: 15,
      fillStyle: '#99ff00',
      x: this.foodModel.position.x,
      y: this.foodModel.position.y,
      letter: this.foodModel.currentLetter,
    });
  }
}
