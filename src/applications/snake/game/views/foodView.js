export default class FoodView {
  constructor(foodModel) {
    this.foodModel = foodModel;
    this.letters = false;
  }

  render(canvas) {
    const font = 'Arial';
    const size = 15;
    const fillStyle = '#FE00DD';
    const strokeStyle = '#FE00DD';

    if (this.foodModel.position) {
      if (this.letters.letters) {
        canvas.drawLetter({
          font,
          size,
          fillStyle,
          x: this.foodModel.position.x,
          y: this.foodModel.position.y,
          letter: this.foodModel.currentLetter,
        });
      } else {
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
}
