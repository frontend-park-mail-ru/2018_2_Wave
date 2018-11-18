import GameCore from './core';
// import bus from '../../modules/bus';

import ws from '../../modules/webSocket';

export default class OnlineGame extends GameCore {
  start() {
    super.start();

    ws.send('start-game', null);
  }

  onControllsPressed(evt) {
    if (this.pressed('LEFT', evt)) {
      ws.send('game-command', 'LEFT');
    } else if (this.pressed('RIGHT', evt)) {
      ws.send('game-command', 'RIGHT');
    } else if (this.pressed('FIRE', evt)) {
      ws.send('game-command', 'FIRE');
    }
  }

  onGameStarted(evt) {
    this.controller.start();
    this.scene.init(evt);
    this.scene.start();
  }

  onGameFinished(evt) {
    bus.emit('CLOSE_GAME');
  }

  onGameStateChanged(evt) {
    this.scene.setState(evt);
  }
}
