import busController from '../../modules/busController';

export default class GameCore {
  constructor(scene) {
    this.scene = scene;
    this.close = this.close.bind(this); 
  }

  start() {
    this.scene.start();
    busController.setBusListeners({ Backspace: this.close });
  }

  pause() {
    // this.scene.pause();
  }

  resume() {
    // this.scene.resume();
  }

  close() {
    busController.emit('link', '/snake');
  }

  destroy() {
    // this.scene.destroy();
    busController.removeBusListeners({ Backspace: this.close });
  }
}
