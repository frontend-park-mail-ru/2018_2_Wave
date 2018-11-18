import busController from '../../modules/busController';

export default class GameScene {
  constructor(canvas) {
    this.busCOntroller = busController;
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    this.ctx = ctx;
    this.state = null;
    this.requestFrameId = null;

    this.lastFrameTime = 0;

    this.renderScene = this.renderScene.bind(this);
  }

  init(state) {
  }

  setState(state) {
    const scene = this.scene;

    this.state = state;

    this.me.x = 50 + state.me.coll * 75;

    this.field.forEach((b, pos) => {
      const item = state.items[pos];
      if (item.dead && b.id) {
        scene.remove(b.id);
        return;
      }

      if (item.fadeLevel) {
        if (!b.fadeLevel) {
          scene.toBack(b.id);
        }

        b.fadeLevel = item.fadeLevel;
      }
    });
  }

  renderScene(now) {
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
