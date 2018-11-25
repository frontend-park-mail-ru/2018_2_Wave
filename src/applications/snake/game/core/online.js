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
import EnemiesView from '../views/enemiesView';

import LevelModel from '../models/levelModel';
import SnakeModel from '../models/snakeModel';
import FoodModel from '../models/foodModel';
import EnemiesModel from '../models/enemiesModel';

import ws from '../../../../modules/webSocket';

export default class OnlineGame extends GameCore {
  constructor(controller, scene, gameInitData) {
    super(controller, scene);

    this.gameloop = this.gameloop.bind(this);
    this.gameloopRequestId = null;
    this.lastFrame = 0;
    this.framesPerSecond = 10;

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

    this.snake = new SnakeModel(this.snakeText, this.startX, this.startY);
    this.snakeController = new SnakeController(this.snake, this.level);
    this.controllers.push(this.snakeController);
    this.scene.push(new SnakeView(this.snake));

    this.food = new FoodModel();
    this.foodController = new FoodController(this.food, this.level);
    this.controllers.push(this.foodController);
    this.scene.push(new FoodView(this.food));

    this.enemies = new EnemiesModel();
    this.scene.push(new EnemiesView(this.enemies));
    this.enemies.push({
      segments: [
        {
          x: 20,
          y: 20,
          letter: 'c',
        },
        {
          x: 21,
          y: 20,
          letter: 'a',
        },
        {
          x: 22,
          y: 20,
          letter: 'e',
        },
      ],
    });

    // this.audioController = new AudioController();
  }

  start() {
    super.start();
    // ws.send('lobby_create', {room_type: 'room_type'});

    this.controllers.forEach(controller => controller.init());

    setTimeout(() => {
      this.busController.emit(events.START_GAME);
    });
  }

  onGameStarted(evt) {
    this.scene.start();

    this.lastFrame = performance.now();
    this.gameloop();
  }

  update() {
    this.controllers.forEach(controller => controller.update());
  }

  gameloop(now) {
    setTimeout((_) => {
      const delay = now - this.lastFrame;
      this.lastFrame = now;

      if (this.keyboardController.isCommand()) {
        this.snakeController.setDirection(this.keyboardController.getLastCommand());
      }

      this.update();

      this.scene.renderScene();

      // busController.emit(events.GAME_STATE_CHANGED);
      // check if dead

      this.gameloopRequestId = requestAnimationFrame(this.gameloop.bind(this));
    }, 1000 / this.framesPerSecond);
  }


  onGameFinished(evt) {
    cancelAnimationFrame(this.gameloopRequestId);
    this.busController.emit('CLOSE_GAME');
  }

  // ??????????????
  onControllsPressed(evt) {
    if (this.pressed('LEFT', evt)) {
      // ws.send('game-command', 'LEFT');
    } else if (this.pressed('RIGHT', evt)) {
      // ws.send('game-command', 'RIGHT');
    } else if (this.pressed('FIRE', evt)) {
      // ws.send('game-command', 'FIRE');
    }
  }
}
