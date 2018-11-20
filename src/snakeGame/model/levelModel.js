import Position from './position';
import Size from './size';

export default class levelModel {
  constructor(size) {
    this.size = size;
    this.map = new Array(this.size.width * this.size.height).fill(0);
  }

  setFood(position) {
    this.map[this.index(position)] = 3;
  }

  removeFood(position) {
    this.map[this.index(position)] = 0;
  }

  isFood(position) {
    return this.map[this.index(position)] === 3;
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

  getField(position) {
    return this.map[this.index(position)];
  }

  getMap() {
    return this.map;
  }

  isEmpty(position) {
    return this.map[this.index(position)] === 0;
  }

  setWall(position, type) {
    this.map[this.index(position)] = type;
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

    while (attempts < this.map.length) {
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
