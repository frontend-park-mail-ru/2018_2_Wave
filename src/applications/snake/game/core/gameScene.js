// import busController from '../modules/busController';
import Canvas from '../utils/canvas';

// Отделить GameScene от gameloop
export default class GameScene {
  constructor(canvas, windowSize, cellSize, orientation) {
    this.canvas = new Canvas(canvas, cellSize, orientation);
    this.canvas.setSize(windowSize);

    this.id = 0;
    this.views = {};
  }

  ID() {
    this.id += 1;
    return `#${this.id}`;
  }

  push(object) {
    const id = this.ID();
    this.views[id] = object;
    return id;
  }

  renderScene() {
    Object.values(this.views).forEach(figure => figure.render(this.canvas));
  }

  start() {
    this.renderScene();
  }

  stop() {
    this.scene.clear();
  }
}
