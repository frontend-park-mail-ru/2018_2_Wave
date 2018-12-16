import GameCore from '../core';
import busController from '../../../modules/busController';
import keyboardController from '../../../modules/keyboardController';
import GAME_MODE from '../modes';

import LevelController from '../../controllers/levelController';
import SnakeController from '../../controllers/snackeController';
import FoodController from '../../controllers/foodController';
import AudioController from '../../controllers/audioController';
import PlayerController from '../../controllers/playerController';

import LevelView from '../../views/levelView';
import SnakeView from '../../views/snakeView';
import FoodView from '../../views/foodView';
import PlayerView from '../../views/playerView';

import LevelModel from '../../models/levelModel';
import SnakeModel from '../../models/snakeModel';
import FoodModel from '../../models/foodModel';
import PlayerModel from '../../models/playerModel';

import DeadMessage from '../../dead_message/dead_message';
import DeadMenuTemplate from './dead_menu.pug';

export default class OfflineGame extends GameCore {
  constructor(scene, gameInitData) {
    super(scene);

    this.gameloop = this.gameloop.bind(this);
    this.gameloopRequestId = null;
    this.framesPerSecond = 10;
    this.paused = false;

    this.cellCount = gameInitData.cellCount;

    this.scene = scene;
    this.busController = busController;

    this.deadMessage  = new DeadMessage();

    this.controllers = [];

    this.level = new LevelModel(this.cellCount);

    this.player = new PlayerModel(gameInitData.userToken);
    this.playerView = new PlayerView();
    this.playerController = new PlayerController(this.player, this.playerView);

    this.levelController = new LevelController(this.level);
    this.controllers.push(this.levelController);
    this.scene.push(new LevelView(this.level));

    this.snake = new SnakeModel();
    this.snakeController = new SnakeController(this.snake, this.level);
    this.controllers.push(this.snakeController);
    this.scene.push(new SnakeView(this.snake));

    this.food = new FoodModel();
    this.foodController = new FoodController(this.food, this.level);
    this.controllers.push(this.foodController);
    this.scene.push(new FoodView(this.food));

    this.audioController = new AudioController();

    this.events = {
      DEAD: this.dead.bind(this),
    };
  }

  setBusListeners() {
    busController.setBusListeners(this.events);
  }

  removeBusListeners() {
    busController.removeBusListeners(this.events);
  }

  start() {
    this.controllers.forEach(controller => controller.init());
    this.playerController.init();
    super.start();

    this.setBusListeners();
    this.audioController.start();
    this.lastFrame = performance.now();
    this.gameloopRequestId = requestAnimationFrame(this.gameloop);
  }


  update() {
    this.controllers.forEach(controller => controller.update());
  }

  gameloop(now) {
    if (!this.isDead) {
      setTimeout((_) => {
        this.lastFrame = now;

        if (keyboardController.isCommand()) {
          this.snakeController.setDirection(keyboardController.getLastCommand());
        }

        if (keyboardController.getSpace()) {
          this.pause();
        }

        this.update();
        this.scene.renderScene();
        this.gameloopRequestId = requestAnimationFrame(this.gameloop);
      }, 1000 / this.framesPerSecond);
    }
  }

  dead() {
    this.isDead = true;
    const deadButtons = {
      'PLAY AGAIN': {
        href: '/game',
        params: `mode=${GAME_MODE.CLASSIC}&type=${GAME_MODE.SINGLPLAYER}`,
      },
      MENU: {
        href: '/snake',
        params: 'menu',
      },
    };

    this.deadMessage.show(DeadMenuTemplate({ deadButtons }), this.player.score);
  }

  pause() {
    if (this.paused) {
      this.resume();
    } else {
      this.paused = true;
      super.pause();
      this.audioController.pause();
    }
  }

  resume() {
    super.resume();
    this.audioController.resume();
    this.paused = false;
  }

  destroy() {
    this.isDead = true;
    super.destroy();
    this.removeBusListeners();
    this.deadMessage.hide();
    this.audioController.destroy();
    cancelAnimationFrame(this.gameloopRequestId);
  }
}
