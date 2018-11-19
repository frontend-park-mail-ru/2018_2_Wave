export default class FoodView {
  constructor(foodModel, canvas) {
    this.foodModel = foodModel;
    this.context = canvas.context;
  }

  render() {
    const [x] = this.foodModel;
    const [y] = this.foodModel;

    // TODO create method for canvas
    this.context.beginPath();
    this.context.font = '15px Arial';
    this.context.fillStyle = '#99ff00';

    // this.context.fillText('a', x, y);
    this.context.fillText(this.foodModel.currenLetter, x, y);

    // this.context.fillRect(x, y, this.levelModel.getCellSize().getWidth(),
    //  this.levelModel.getCellSize().getHeight());
    this.context.closePath();
  }
}
