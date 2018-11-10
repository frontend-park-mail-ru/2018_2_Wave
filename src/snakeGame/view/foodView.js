export default class FoodView {
  constructor(foodModel, levelModel, canvas) {
    this.foodModel = foodModel;
    this.levelModel = levelModel;
    this.context = canvas.context;
  }

  render() {
    const x = (this.foodModel.getX() * this.levelModel.getCellSize().getWidth());
    const y = (this.foodModel.getY() * this.levelModel.getCellSize().getHeight());

    this.context.beginPath();
    this.context.font = '15px Arial';
    this.context.fillStyle = '#99ff00';

    this.context.fillText('a', x, y);

    // this.context.fillRect(x, y, this.levelModel.getCellSize().getWidth(), this.levelModel.getCellSize().getHeight());
    this.context.closePath();
  }
}
