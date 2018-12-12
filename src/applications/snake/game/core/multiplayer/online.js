import GameCore from '../core';
import busController from '../../../modules/busController';
import GAME_MODE from '../modes';

import LevelController from '../../controllers/levelController';
import SnakeController from '../../controllers/snackeController';
import FoodsController from '../../controllers/foodsController';
import AudioController from '../../controllers/audioController';
import keyboardController from '../../../modules/keyboardController';

import LevelView from '../../views/levelView';
import SnakeView from '../../views/snakeView';
import FoodsView from '../../views/foodsView';
import EnemyView from '../../views/enemyView';

import LevelModel from '../../models/levelModel';
import SnakeModel from '../../models/snakeModel';
import FoodsModel from '../../models/foodsModel';
import EnemyModel from '../../models/enemyModel';

import WsMessageParser from '../../../modules/wsMessageParser';
import WsPostman from '../../../modules/wsPostman';

import DeadMessage from '../../dead_message/dead_message';
import DeadMenuTemplate from './dead_menu.pug';

import style from './multiplayer.css';

export default class OnlineGame extends GameCore {
  constructor(scene, gameInitData) {
    super(scene);

    this.wsMessageParser = new WsMessageParser();
    this.wsPostman = new WsPostman();

    this.gameloop = this.gameloop.bind(this);
    this.gameloopRequestId = null;
    this.lastFrame = 0;
    this.framesPerSecond = 30;

    this.cellCount = gameInitData.cellCount;

    this.scene = scene;
    this.keyboardController = keyboardController;
    this.busController = busController;

    this.controllers = [];

    this.level = new LevelModel(this.cellCount);

    this.levelController = new LevelController(this.level);
    this.controllers.push(this.levelController);
    this.scene.push(new LevelView(this.level));

    this.snake = new SnakeModel();
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

    this.deadMessage  = new DeadMessage();
    // this.audioController = new AudioController();

    this.events = {
      STATUS_DEAD: this.dead.bind(this),
    };
  }

  setBusListeners() {
    busController.setBusListeners(this.events);
  }

  removeBusListeners() {
    busController.removeBusListeners(this.events);
  }


  start() {
    this.wsPostman.startGame();
    super.start();

    // this.audioController.start();
    this.setBusListeners();
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
        this.wsPostman.sendDirection(this.keyboardController.getLastCommand());
        // this.snakeController.setDirection(this.keyboardController.getLastCommand());
      }

      this.scene.renderScene();
      this.gameloopRequestId = requestAnimationFrame(this.gameloop);
    }, 1000 / this.framesPerSecond);
  }

  dead() {
    this.isDead = true;
    const deadButtons = {
      'PLAY AGAIN': {
        href: '/game',
        params: `mode=${GAME_MODE.MULTIPLYER}&type=${GAME_MODE.SINGLPLAYER}`,
      },
      MENU: {
        href: '/snake',
        params: 'menu',
      },
    };
    const template = DeadMenuTemplate({ deadButtons });
    this.deadMessage.show(template, 25);
  }

  destroy() {
    super.destroy();
    this.deadMessage.hide();
    this.removeBusListeners();
    // this.audioController.destroy();
    cancelAnimationFrame(this.gameloopRequestId);
  }
}
