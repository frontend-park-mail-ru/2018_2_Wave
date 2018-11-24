import GameCore from './core';
import events from './events';
import busController from '../../modules/busController';
import Size from '../models/size';

import LevelController from '../controllers/levelController';
import SnakeController from '../controllers/snackeController';
import FoodController from '../controllers/foodController';
import AudioController from '../controllers/audioController';

import LevelView from '../views/levelView';
import SnakeView from '../views/snakeView';
import FoodView from '../views/foodView';

import LevelModel from '../models/levelModel';
import SnakeModel from '../models/snakeModel';
import FoodModel from '../models/foodModel';

export default class OfflineGame extends GameCore {
  constructor(controller, scene, gameInitData) {
    super(controller, scene);

    this.gameloop = this.gameloop.bind(this);
    this.gameloopRequestId = null;
    this.lastFrame = 0;
    this.framesPerSecond = 10;

    this.snakeText = gameInitData.snakeText;
    this.startX = gameInitData.DOMRect.x;
    this.startY = gameInitData.DOMRect.y;

    this.cellCount = gameInitData.cellCount;

    this.scene = scene;
    this.keyboardController = controller;
    this.busController = busController;

    this.controllers = [];


    this.level = new LevelModel(this.cellCount);

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

    // this.audioController = new AudioController();
  }

  start() {
    super.start();

    this.controllers.forEach(controller => controller.init());

    this.lastFrame = performance.now();
    this.gameloopRequestId = requestAnimationFrame(this.gameloop);
  }


  update() {
    this.controllers.forEach(controller => controller.update());
  }

  gameloop(now) {
    setTimeout((_) => {
      this.lastFrame = now;

      if (this.keyboardController.lastCommand) {
        this.snakeController.setDirection(this.keyboardController.getLastCommand());
      }

      this.update();

      this.scene.renderScene();

      this.gameloopRequestId = requestAnimationFrame(this.gameloop.bind(this));
    }, 1000 / this.framesPerSecond);
  }

  pause() {
    super.pause();
    cancelAnimationFrame(this.gameloopRequestId);
  }

  resume() {
    super.resume();

    this.lastFrame = performance.now();
    this.gameloopRequestId = requestAnimationFrame(this.gameloop);
  }

  destroy() {
    super.destroy();
    cancelAnimationFrame(this.gameloopRequestId);
  }
}
