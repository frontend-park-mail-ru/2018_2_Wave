import busController from '../../modules/busController';
import Position from '../models/position';

export default class LevelController {
  constructor(level) {
    this.busController = busController;
    this.level = level;

    this.maxWallLength  = this.level.getHeight() / 4;

    this.eventsMethosds = {
      pickFood: this.removeFoodFromMap.bind(this),
    };

    this.busController.setBusListeners(this.eventsMethosds);

    this.generateLevel();
  }

  removeFoodFromMap(position) {
    this.level.removeFood(position);
  }

  init() {
    this.generateLevel();
  }

  generateLevel() {
    const levelHeight = this.level.size.height;
    const levelWidth = this.level.size.width;

    this.maxWallLength = 10;

    let wallLength = this.maxWallLength;
    let wallType = 1;

    // TODO переделать нормально
    for (let x = 0; x < levelWidth; x += 1) {
      if (wallLength) {
        if (wallType) {
          this.level.setWall(new Position(x, 0), wallType);
          this.level.setWall(new Position(x, levelHeight - 1), wallType);
        }
        wallLength -= 1;
      } else {
        console.log('wallType', wallType);
        wallLength = Math.floor(Math.random() * this.maxWallLength) + 3;
        if (wallType) {
          wallType = 0;
        } else {
          wallType = Math.floor(Math.random() * 2) + 1;
        }
      }
    }

    wallLength = this.maxWallLength;
    for (let y = 0; y < levelHeight; y += 1) {
      if (wallLength) {
        this.level.setWall(new Position(0, y), wallType);
        this.level.setWall(new Position(levelWidth - 1, y), wallType);
        wallLength -= 1;
      } else {
        wallLength = this.maxWallLength;
        wallType = Math.floor(Math.random() * 3);
      }
    }

    return this.level.getMap();
  }

  update() {
  }
}
