export default class FoodView {
  constructor(foodModel, levelModel, canvas) {
    this.foodModel = foodModel;
    this.levelModel = levelModel;
    this.context = canvas.context;
  }

  render() {
    const x = (this.foodModel.getX() * this.levelModel.getCellSize().x) + 0.5;
    const y = (this.foodModel.getY() * this.levelModel.getCellSize().y) + 0.5;

    this.context.beginPath();
    switch (this.foodModel.getType()) {
      case 0:
        this.context.strokeStyle = '#00ff00';
        break;

      case 1:
        this.context.strokeStyle = '#ffff00';
        break;

      case 2:
        this.context.strokeStyle = '#00ffff';
        break;

      default:
        this.context.strokeStyle = '#00ff00';
        break;
    }
    // this.context.fillRect(x, y, this.levelModel.getCellSize(), this.levelModel.getCellSize());
    this.context.ellipse(x + this.levelModel.getCellSize() / 2,
      y + this.levelModel.getCellSize() / 2,
      this.levelModel.getCellSize() / 3,
      this.levelModel.getCellSize() / 2 - 0.2,
      0,
      0,
      2 * Math.PI);
    this.context.stroke();
    this.context.closePath();
  }
}
