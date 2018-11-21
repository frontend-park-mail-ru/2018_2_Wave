// import busController from '../../modules/busController';
import Canvas from '../utils/canvas';

export default class GameScene {
  constructor(root, windowSize, cellSize) {
    this.canvas = new Canvas(root, cellSize);
    this.canvas.setSize(windowSize);

    this.state = null;
    this.requestFrameId = null;

    this.lastFrameTime = 0;
    this.id = 0;
    this.views = [];

    this.renderScene = this.renderScene.bind(this);
  }

  /*
  init(state) {

  }
  */

  ID() {
    this.id += 1;
    return `#${this.id}`;
  }

  push(object) {
    const id = this.ID();
    this.views[id] = object;
    return id;
  }

  /*
  setState(sceneObjects) {
  }
  */

  renderScene() {
    this.views.forEach(figure => figure.render(this.canvas));
    this.requestFrameId = requestAnimationFrame(this.renderScene);
  }

  start() {
    this.lastFrameTime = performance.now();
    this.requestFrameId = requestAnimationFrame(this.renderScene);
  }

  stop() {
    if (this.requestFrameId) {
      window.cancelAnimationFrame(this.requestFrameId);
      this.requestFrameId = null;
    }

    this.scene.clear();
  }
}
