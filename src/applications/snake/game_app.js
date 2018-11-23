import BaseApp from '../base_app';

import GameEnv from './views/env';
import GameView from './views/game_field';


export default class SnakeApp extends BaseApp {
  constructor(appUrl, parent) {
    const env = new GameEnv(parent);
    super(appUrl, env.getContainer(), GameView);

    this.env = env;
    this.content = this.env.getContainer();
  }


  start() {
    this.env.show();
    super.start();
  }

  pause() {
    this.env.hide();
    super.pause();
  }

  resume() {
    this.env.show();
    super.resume();
  }
}
