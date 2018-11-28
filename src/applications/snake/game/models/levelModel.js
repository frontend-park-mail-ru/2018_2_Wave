import Position from './position';
import Size from './size';

export default class levelModel {
  constructor(size) {
    this.size = size;
    // this.map = new Array(this.size.width * this.size.height).fill(0);
    this.walls = [];
    this.food = [];
  }

  setFood(position) {
    // this.map[this.index(position)] = 3;
    this.food.push(position);
  }

  removeFood(position) {
    // this.map[this.index(position)] = 0;
    this.food.splice(this.food.indexOf(position), 1);
  }

  isFood(position) {
    console.log(this.food.indexOf(position));
    return levelModel.indexOf(this.food, position) !== -1;
    // return this.map[this.index(position)] === 3;
  }

  static indexOf(list, position) {
    let index = -1;
    list.some((element, listIndex) => {
      if (element.x === position.x && element.y === position.y) {
        index = listIndex;
        return true;
      }
      return false;
    });
    return index;
  }

  isWall(position) {
    return levelModel.indexOf(this.walls, position) !== -1;
    /*return this.map[this.index(position)] === 1
    || this.map[this.index(position)] === 2;*/
  }

  getWidth() {
    return this.size.getWidth();
  }

  getHeight() {
    return this.size.getHeight();
  }

  getCellSize() {
    return new Size(this.cellWidth, this.cellHeight);
  }

  index(place) {
    return ((place.getX() * this.size.getWidth()) + place.getY());
  }

  /*
  getField(position) {
    return this.map[this.index(position)];
  }


  getMap() {
    return this.map;
  }
  */

  isEmpty(position) {
    // return this.map[this.index(position)] === 0;
    return !(this.isFood(position) || this.isWall(position));
  }

  setWall(position, type) {
    // this.map[this.index(position)] = type;
    this.walls.push(position);
  }

  static isOrdered(orderedPositions, position) {
    let ordered = false;
    orderedPositions.some((orderedPosition) => {
      if (orderedPosition.getX() === position.getX()
        && orderedPosition.getY() === position.getY()) {
        ordered = true;
        return ordered;
      }
      return ordered;
    });
    return ordered;
  }

  getEmptyCell(orderedPositions = []) {
    let attempts = 0;

    while (attempts < this.size.width * this.size.height) {
      const x = Math.floor(Math.random() * this.size.getWidth());
      const y = Math.floor(Math.random() * this.size.getHeight());
      const position = new Position(x, y);


      if (this.isEmpty(position) && !levelModel.isOrdered(orderedPositions, position)) {
        return position;
      }
      attempts += 1;
    }
    return undefined;
  }
}
