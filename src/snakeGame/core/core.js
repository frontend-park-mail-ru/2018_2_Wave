import busController from '../modules/busController';

export default class GameCore {
  constructor(controller, scene) {
    this.controller = controller;
    this.scene = scene;

    this.busController = busController;

    // for pause
    // this.paused = true;
    this.paused = false;

    this.directions = {
      Up: 'UP',
      Down: 'DOWN',
      Left: 'LEFT',
      Right: 'RIGHT',
    };

    this.eventsMethods = {
    // TODO add variable from events
      START_GAME: this.onGameStarted.bind(this),
      FINISH_GAME: this.onGameFinished.bind(this),
      // CONTROLS_PRESSED: this.onControllsPressed.bind(this),
      // GAME_STATE_CHANGED: this.onGameStateChanged.bind(this),
    };
  }

  start() {
    this.busController.setBusListeners(this.eventsMethods);
  }

  destroy() {
    busController.removeBusListeners(this.eventsMethods);

    this.controller.stop();
    this.scene.stop();
  }

  /*
  onControllsPressed(evt) {
    throw new Error('This method must be overridden');
  }
  */

  onGameStarted(evt) {
    throw new Error('This method must be overridden');
  }

  onGameFinished(evt) {
    throw new Error('This method must be overridden');
  }

  /*
  onGameStateChanged(evt) {
    throw new Error('This method must be overridden');
  }
  */
}
