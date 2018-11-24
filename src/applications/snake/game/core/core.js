export default class GameCore {
  constructor(keyboardController, scene) {
    this.keyboardController = keyboardController;
    this.scene = scene;
  }

  start() {
    this.keyboardController.start();
    this.scene.start();
  }

  pause() {
    this.keyboardController.stop();
    this.scene.pause();
  }

  resume() {
    this.keyboardController.start();
    this.scene.resume();
  }

  destroy() {
    this.keyboardController.stop();
    this.scene.destroy();
  }
}
