import busController from '../../modules/busController';
import Canvas from '../utils/canvas';

export default class GameScene {
  constructor() {
    this.busCOntroller = busController;
    this.canvas = new Canvas(this.wrapper);
    this.ctx = this.canvas.context;
    this.state = null;
    this.requestFrameId = null;

    this.lastFrameTime = 0;
    this.id = 0;

    this.renderScene = this.renderScene.bind(this);
  }

  init(state) {

  }

  ID() {
    this.id += 1;
    return `#${this.id}`;
  }

  push(object) {
    const id = this.ID();
    this.objects[id] = object;
    
    return id;
  }

  setState(sceneObjects) {
    
  }

  renderScene(now) {
    this.backView.forEach(figure => figure.render());
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
