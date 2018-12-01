import GameCore from './core';
import events from './events';
import busController from '../../modules/busController';
import Size from '../models/size';

import LevelController from '../controllers/levelController';
import SnakeController from '../controllers/snackeController';
import FoodsController from '../controllers/foodsController';
import AudioController from '../controllers/audioController';

import LevelView from '../views/levelView';
import SnakeView from '../views/snakeView';
import FoodsView from '../views/foodsView';
import EnemyView from '../views/enemyView';

import LevelModel from '../models/levelModel';
import SnakeModel from '../models/snakeModel';
import FoodsModel from '../models/foodsModel';
import EnemyModel from '../models/enemyModel';

import wsMessgase from '../../modules/wsMessage';

import wsMessageParser from '../../modules/wsMessageParser';


export default class OnlineGame extends GameCore {
  constructor(scene, gameInitData) {
    super(scene);

    this.wsMessageParser = wsMessageParser;

    this.gameloop = this.gameloop.bind(this);
    this.gameloopRequestId = null;
    this.lastFrame = 0;
    this.framesPerSecond = 30;

    this.snakeText = gameInitData.snakeText;
    // this.DOMRect = gameInitData.DOMRect;
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

    this.snake = new SnakeModel(this.snakeText, this.startX, this.startY, gameInitData.userToken);
    this.snakeController = new SnakeController(this.snake, this.level);
    this.controllers.push(this.snakeController);
    this.scene.push(new SnakeView(this.snake));

    this.foods = new FoodsModel(10);
    this.foodsController = new FoodsController(this.foods, this.level);
    this.controllers.push(this.foodsController);
    this.scene.push(new FoodsView(this.foods));

    this.enemie = new EnemyModel(gameInitData.userToken);
    this.scene.push(new EnemyView(this.enemie));

    this.wsMessageParser.setModel('snakes', this.snake);
    this.wsMessageParser.setModel('snakes', this.enemie);
    this.wsMessageParser.setModel('food', this.foods);
    this.wsMessageParser.setModel('walls', this.level);

    // this.audioController = new AudioController();
  }


  start() {
    // this.controllers.forEach(controller => controller.init());
    super.start();

    // this.audioController.start();
    this.lastFrame = performance.now();
    this.gameloopRequestId = requestAnimationFrame(this.gameloop);
  }


  update() {
    // this.controllers.forEach(controller => controller.update());
  }

  gameloop(now) {
    setTimeout((_) => {
      this.lastFrame = now;

      if (this.keyboardController.isCommand()) {
        wsMessgase.sendDirection(this.keyboardController.getLastCommand());
        // this.snakeController.setDirection(this.keyboardController.getLastCommand());
      }

      this.scene.renderScene();
      this.gameloopRequestId = requestAnimationFrame(this.gameloop);
    }, 1000 / this.framesPerSecond);
  }

  pause() {
    this.paused = true;
    busController.removeBusListeners(this.stopEvents);
    busController.setBusListeners(this.resumeEvents);
    super.pause();
    // this.audioController.pause();
  }

  resume() {
    busController.removeBusListeners(this.resumeEvents);
    busController.setBusListeners(this.stopEvents);
    super.resume();
    // this.audioController.resume();
    this.paused = false;
  }

  destroy() {
    super.destroy();
    // this.audioController.destroy();
    cancelAnimationFrame(this.gameloopRequestId);
  }


  onGameStarted(evt) {
    this.scene.start();

    this.lastFrame = performance.now();
    this.gameloop();
  }
}
