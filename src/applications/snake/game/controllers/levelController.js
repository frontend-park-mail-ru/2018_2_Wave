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

    this.setBusListeners();
    this.generateLevel();
  }

  setBusListeners() {
    this.busController.setBusListeners(this.eventsMethosds);
  }

  removeBusListeners() {
    this.busController.removeBusListeners(this.eventsMethosds);
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
        wallLength = Math.floor(Math.random() * this.maxWallLength) + 3;
        if (wallType) {
          wallType = 0;
        } else {
          wallType = Math.floor(Math.random() * 2) + 1;
        }
      }
    }

    const rwc = 5;
    for (let rc = 0; rc < rwc; rc += 1) {
      // calculate a position for a random wall, somewhere within the walls of the grid.
      let rwx  = Math.floor(3 + Math.random() * (levelWidth - 6));
      let rwy  = Math.floor(3 + Math.random() * (levelHeight - 6));
      const rwl  = Math.floor(3 + Math.random() * 5);
      const rwdx = ((rwx < levelWidth / 2) ? 1 : -1);
      const rwdy = ((rwy < levelHeight / 2) ? 1 : -1);

      for (let ri = 0; ri < rwl; ri += 1) {
        // const i = this.level.index(rwx, rwy);
 
        // if(level.wdata[i] !== 0) {
        //   break;
        // }

        this.level.setWall({ x: rwx, y: rwy });

        rwx += rwdx;
        rwy += rwdy;
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

  }

  update() {
  }

  stop() {
    this.removeBusListeners();
  }
}
