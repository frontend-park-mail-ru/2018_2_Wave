import GameCore from './core';
import events from './events';
import busController from '../../modules/busController';
import Size from '../models/size';
import keyboardController from '../../modules/keyboardController';

import LevelController from '../controllers/levelController';
import SnakeController from '../controllers/snackeController';
import FoodController from '../controllers/foodController';
import AudioController from '../controllers/audioController';
import PlayerController from '../controllers/playerController';

import LevelView from '../views/levelView';
import SnakeView from '../views/snakeView';
import FoodView from '../views/foodView';

import LevelModel from '../models/levelModel';
import SnakeModel from '../models/snakeModel';
import FoodModel from '../models/foodModel';
import PlayerModel from '../models/playerModel';

export default class OfflineGame extends GameCore {
  constructor(scene, gameInitData) {
    super(scene);

    this.gameloop = this.gameloop.bind(this);
    this.gameloopRequestId = null;
    this.framesPerSecond = 10;
    this.paused = false;

    this.snakeText = gameInitData.snakeText;
    this.startX = gameInitData.DOMRect.x;
    this.startY = gameInitData.DOMRect.y;

    this.cellCount = gameInitData.cellCount;

    this.scene = scene;
    this.busController = busController;

    this.controllers = [];

    this.level = new LevelModel(this.cellCount);
    
    this.player = new PlayerModel();
    this.playerController = new PlayerController(this.player);

    this.levelController = new LevelController(this.level);
    this.controllers.push(this.levelController);
    this.scene.push(new LevelView(this.level));

    this.snake = new SnakeModel(this.snakeText, this.startX, this.startY);
    this.snakeController = new SnakeController(this.snake, this.level);
    this.controllers.push(this.snakeController);
    this.scene.push(new SnakeView(this.snake));

    this.food = new FoodModel();
    this.foodController = new FoodController(this.food, this.level);
    this.controllers.push(this.foodController);
    this.scene.push(new FoodView(this.food));

    this.audioController = new AudioController();
  }

  setBusListeners() {
    busController.setBusListeners(this.stopEvents);
  }

  

  start() {
    this.controllers.forEach(controller => controller.init());
    super.start();

    this.audioController.start();
    this.lastFrame = performance.now();
    this.gameloopRequestId = requestAnimationFrame(this.gameloop);
  }


  update() {
    this.controllers.forEach(controller => controller.update());
  }

  gameloop(now) {
    setTimeout((_) => {
      this.lastFrame = now;

      if (keyboardController.isCommand()) {
        this.snakeController.setDirection(keyboardController.getLastCommand());
      }

      if (keyboardController.getSpace()) {
        this.pause();
      }

      if (!this.paused) {
        this.update();
      }

      this.scene.renderScene();
      this.gameloopRequestId = requestAnimationFrame(this.gameloop);
    }, 1000 / this.framesPerSecond);
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
    super.destroy();
    this.audioController.destroy();
    cancelAnimationFrame(this.gameloopRequestId);
  }
}
