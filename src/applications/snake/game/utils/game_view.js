import BaseApp from '../../../base_app';

import SnakeGame from '../game';
import GameEnv from './game_env';

export default class GameView extends BaseApp {
  constructor(parent, appUrl) {
    const env = new GameEnv(parent);

    super(appUrl, env.getContainer(), SnakeGame);

    this.env = env;
    this.content = this.env.getContainer();

    // this.appWrapper = ???
    // hmmm let me think what kind of shit it should be
  }


  start() {
    this.env.show();
    super.start();
  }

  // stop() {
  //   console.error('Cannot stop main app');
  // }

  pause() {
    this.env.hide();
    super.pause();
  }

  resume() {
    this.env.show();
    super.resume();
  }
}
