import GameCore from '../core';
import keyboardController from '../../../modules/keyboardController';
import busController from '../../../modules/busController';
import GAME_MODE from '../modes';

import LevelController from '../../controllers/levelController';
import SnakeController from '../../controllers/snackeController';
import FoodsController from '../../controllers/foodsController';
import AudioController from '../../controllers/audioController';
import PlayerController from '../../controllers/playerController';
import FrameSpeedController from '../../controllers/frameSpeedController';

import LevelView from '../../views/levelView';
import SnakeView from '../../views/snakeView';
import FoodsView from '../../views/foodsView';
import PlayerView from '../../views/playerView';

import LevelModel from '../../models/levelModel';
import SnakeModel from '../../models/snakeModel';
import FoodsModel from '../../models/foodsModel';
import PlayerModel from '../../models/playerModel';
import FrameSpeedModel from '../../models/frameSpeedModel';

import DeadMessage from '../../dead_message/dead_message';
import DeadMenuTemplate from './dead_menu.pug';
import ErrorMessage from '../../../error_message/errorMessage';

export default class ArcadeMode extends GameCore {
  constructor(scene, gameInitData) {
    super(scene);

    this.gameloop = this.gameloop.bind(this);
    this.gameloopRequestId = null;
    this.paused = false;

    this.snakeText = gameInitData.snakeText;

    this.cellCount = gameInitData.cellCount;

    this.scene = scene;
    this.keyboardController = keyboardController;
    this.busController = busController;

    this.controllers = [];

    this.frameSpeed = new FrameSpeedModel();
    this.frameSpeedController = new FrameSpeedController(this.frameSpeed);
    this.controllers.push(this.frameSpeedController);

    this.level = new LevelModel(this.cellCount);

    this.player = new PlayerModel(gameInitData.userToken);
    this.playerView = new PlayerView();
    this.playerController = new PlayerController(this.player, this.playerView);

    this.levelController = new LevelController(this.level);
    this.controllers.push(this.levelController);
    this.scene.push(new LevelView(this.level));

    // передаем колличество еды на поле
    this.foods = new FoodsModel(10);
    this.foodsController = new FoodsController(this.foods, this.level);
    this.controllers.push(this.foodsController);
    this.scene.push(new FoodsView(this.foods));

    this.snake = new SnakeModel(this.snakeText);
    this.snakeController = new SnakeController(this.snake, this.level);
    this.controllers.push(this.snakeController);
    this.scene.push(new SnakeView(this.snake));

    this.audioController = new AudioController();
    this.errorMessage = new ErrorMessage();
    this.deadMessage  = new DeadMessage();

    this.resume =  this.resume.bind(this);
    this.resumeEvents = {
      Space: this.resume,
    };

    this.pause = this.pause.bind(this);
    this.stopEvents = {
      Space: this.pause,
    };
    this.events = {
      DEAD: this.dead.bind(this),
      // Space: this.pause,
    };

    this.setBusListeners();
  }

  setBusListeners() {
    busController.setBusListeners(this.stopEvents);
    busController.setBusListeners(this.events);
  }

  removeBusListeners() {
    busController.removeBusListeners(this.events);
    busController.removeBusListeners(this.resumeEvents);
    busController.removeBusListeners(this.events);
  }

  start() {
    this.errorMessage.setErrorMessage('You are in develop version');
    this.controllers.forEach(controller => controller.init());
    this.playerController.init();
    super.start();

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

        if (this.keyboardController.isCommand()) {
          this.snakeController.setDirection(this.keyboardController.getLastCommand());
        }

        if (!this.paused) {
          this.update();
        }

        this.scene.renderScene();

        this.gameloopRequestId = requestAnimationFrame(this.gameloop);
      }, 1000 / this.frameSpeed.getSpeed());
    }
  }

  dead() {
    this.isDead = true;
    const deadButtons = {
      'PLAY AGAIN': {
        href: '/game',
        params: `mode=${GAME_MODE.ARCADE}&type=${GAME_MODE.SINGLPLAYER}`,
      },
      MENU: {
        href: '/snake',
        params: 'menu',
      },
    };

    this.deadMessage.show(DeadMenuTemplate({ deadButtons }), this.player.score);
  }

  pause() {
    this.paused = true;
    busController.removeBusListeners(this.stopEvents);
    busController.setBusListeners(this.resumeEvents);
    super.pause();
    this.audioController.pause();
  }

  resume() {
    busController.removeBusListeners(this.resumeEvents);
    busController.setBusListeners(this.stopEvents);
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
