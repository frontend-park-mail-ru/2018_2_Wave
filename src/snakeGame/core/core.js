// import events from 'events';
// import bus from '../../modules/bus';

import keyboardController from '../../modules/keyboardController';
import busController from '../../modules/busController';

export default class GameCore {
  constructor(controller, scene) {
    this.controller = controller;
    this.scene = scene;


    this.keyboardController = keyboardController;
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
      CONTROLS_PRESSED: this.onControllsPressed.bind(this),
      GAME_STATE_CHANGED: this.onGameStateChanged.bind(this),
    };

    this.busController.setBusListeners(this.eventsMethods);
  }

  start() {
  }

  destroy() {
    busController.removeBusListeners(this.eventsMethods);

    this.controller.destroy();
    this.scene.stop();
  }

  onControllsPressed(evt) {
    throw new Error('This method must be overridden');
  }

  onGameStarted(evt) {
    throw new Error('This method must be overridden');
  }

  onGameFinished(evt) {
    throw new Error('This method must be overridden');
  }

  onGameStateChanged(evt) {
    throw new Error('This method must be overridden');
  }

  _pressed(name, data) {
    return KEYS[name].some(k => data[k.toLowerCase()]);
  }
}
