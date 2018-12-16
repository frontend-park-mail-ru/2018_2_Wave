import config from '../../modules/view_config';

export default class LevelView {
  constructor(levelModel) {
    this.levelModel = levelModel;
  }

  render(canvas) {
    canvas.setBlackBackground(this.levelModel.size.width,
      this.levelModel.size.height);

    const fillStyle = config.wallColor;
    const strokeStyle = config.wallColor;
    this.levelModel.walls.forEach((wall) => {
      canvas.drawRect({
        fillStyle,
        strokeStyle,
        x: wall.x,
        y: wall.y,
      });
    });
  }
}
