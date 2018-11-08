import Position from './position';

export default class levelModel {
  constructor(size, cellSize) {
    this.size = size;
    this.cellSize = cellSize;
    this.map = new Array(this.size.getWidth() * this.size.getHeight()).fill(0);
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
    return this.cellSize;
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
