import busController from '../../modules/busController';
import Position from '../model/position';

export default class LevelController {
  constructor(levelModel) {
    this.busController = busController;
    this.levelModel = levelModel;

    this.maxWallLength  = this.levelModel.getHeight() / 4;

    this.eventsMethosds = {
      setFood: this.setFoodOnMap.bind(this),
      pickFood: this.removeFoodFromMap.bind(this),
    };

    this.busController.setBusListeners(this.eventsMethosds);

    this.generateLevel();
  }

  removeFoodFromMap(position, orderedSegments) {
    this.levelModel.removeFood(position);
    this.busController.emit('resetFood', this.levelModel.getEmptyCell(orderedSegments));
  }

  setFoodOnMap(position) {
    this.levelModel.setFood(position);
  }

  generateLevel() {

    const levelHeight = this.levelModel.getHeight();
    const levelWidth = this.levelModel.getWidth();

    let wallLength = this.maxWallLength;
    let wallType = 1;

    console.log(levelHeight, levelWidth, wallLength);
    for (let x = 0; x < levelWidth; x += 1) {
      if (wallLength) {
        this.levelModel.setWall(new Position(x, 0), wallType);
        this.levelModel.setWall(new Position(x, levelHeight - 1), wallType);
        wallLength -= 1;
      } else {
        wallLength = this.maxWallLength;
        wallType = Math.floor(Math.random() * 3);
      }
    }

    wallLength = this.maxWallLength;
    for (let y = 0; y < levelHeight; y += 1) {
      if (wallLength) {
        this.levelModel.setWall(new Position(0, y), wallType);
        this.levelModel.setWall(new Position(levelWidth - 1, y), wallType);
        wallLength -= 1;
      } else {
        wallLength = this.maxWallLength;
        wallType = Math.floor(Math.random() * 3);
      }
    }

    return this.levelModel.getMap();
  }

  update() {
  }
}
