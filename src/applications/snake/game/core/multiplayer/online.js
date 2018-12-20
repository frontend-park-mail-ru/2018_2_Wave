import GameCore from '../core';
import busController from '../../../modules/busController';

import LevelController from '../../controllers/levelController';
// import SnakeController from '../../controllers/snackeController';
import FoodsController from '../../controllers/foodsController';
import AudioController from '../../controllers/audioController';
import keyboardController from '../../../modules/keyboardController';

import LevelView from '../../views/levelView';
// import SnakeView from '../../views/snakeView';
import FoodsView from '../../views/foodsView';
import EnemiesView from '../../views/enemiesView';

import LevelModel from '../../models/levelModel';
// import SnakeModel from '../../models/snakeModel';
import FoodsModel from '../../models/foodsModel';
import EnemiesModel from '../../models/enemiesModel';
import globalUser from '../../../globalUser';
import PlayerModel from '../../models/playerModel';
import PlayersModel from '../../models/playersModel';

import WsMessageParser from '../../../modules/wsMessageParser';
import WsPostman from '../../../modules/wsPostman';

import DeadMessage from '../../dead_message/dead_message';
import DeadMenuTemplate from './dead_menu.pug';

import './multiplayer.pcss';

export default class OnlineGame extends GameCore {
  constructor(scene, gameInitData) {
    super(scene);

    this.wsMessageParser = new WsMessageParser();
    this.wsPostman = new WsPostman();

    this.gameloop = this.gameloop.bind(this);
    this.gameloopRequestId = null;
    this.lastFrame = 0;
    this.framesPerSecond = 30;

    this.gameInitData = gameInitData;
    this.cellCount = this.gameInitData.cellCount;

    this.scene = scene;
    this.keyboardController = keyboardController;
    this.keyboardController.setOrintation(gameInitData.orientation);
    this.busController = busController;

    this.controllers = [];

    this.level = new LevelModel(this.cellCount);

    this.levelController = new LevelController(this.level);
    this.controllers.push(this.levelController);
    this.scene.push(new LevelView(this.level));

    this.foods = new FoodsModel(10);
    this.foodsController = new FoodsController(this.foods, this.level);
    this.controllers.push(this.foodsController);
    this.scene.push(new FoodsView(this.foods));

    this.boosts = new FoodsModel(10);
    this.boostsController = new FoodsController(this.boosts, this.level);
    this.controllers.push(this.boostsController);
    this.scene.push(new FoodsView(this.boosts));

    this.player = new PlayerModel();

    this.enemies = new EnemiesModel(this.player);
    this.scene.push(new EnemiesView(this.enemies));

    this.wsMessageParser.setModel('snakes', this.enemies);
    this.wsMessageParser.setModel('food', this.foods);
    this.wsMessageParser.setModel('walls', this.level);
    this.wsMessageParser.setModel('boosters', this.boosts);
    
    this.playersModel = new PlayersModel();
    this.deadMessage  = new DeadMessage();
    this.audioController = new AudioController();

    this.events = {
      STATUS_DEAD: this.dead.bind(this),
      win: this.win.bind(this),
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

    this.setBusListeners();
    this.lastFrame = performance.now();
    this.gameloopRequestId = requestAnimationFrame(this.gameloop);
  }


  update() {
  }

  gameloop(now) {
    this.timerId = setTimeout((_) => {
      this.lastFrame = now;

      if (this.keyboardController.isCommand()) {
        this.wsPostman.sendDirection(this.keyboardController.getLastCommand());
      }

      this.scene.renderScene();
      this.gameloopRequestId = requestAnimationFrame(this.gameloop);
    }, 1000 / this.framesPerSecond);
  }

  win(message) {
    if (message.payload.user_token === globalUser.userToken) {
      const deadButtons = {
        'PLAY AGAIN': {
          href: '/game',
          params: `mode=${this.gameInitData.mode}&type=${this.gameInitData.type}`,
        },
        MENU: {
          href: '/snake',
          params: 'menu',
        },
      };
      const template = DeadMenuTemplate({ deadButtons });
      this.deadMessage.show(template, this.player.score, 'You Won!');
    }
  }

  dead(message) {
    if (message.payload.user_token === globalUser.userToken)  {
      this.isDead = true;
      this.playersModel.setDead(message.payload.user_serial);

      const deadButtons = {
        'PLAY AGAIN': {
          href: '/game',
          params: `mode=${this.gameInitData.mode}&type=${this.gameInitData.type}`,
        },
        MENU: {
          href: '/snake',
          params: 'menu',
        },
      };
      const template = DeadMenuTemplate({ deadButtons });
      this.deadMessage.show(template, this.player.score);
    } else {
      this.playersModel.setDead(message.payload.user_serial);
    }
  }

  destroy() {
    this.wsPostman.sendGameExit();
    this.wsPostman.sendRemoveFromRoom();
    super.destroy();
    this.deadMessage.hide();
    this.removeBusListeners();
    // this.audioController.destroy();
    clearTimeout(this.timerId);
    cancelAnimationFrame(this.gameloopRequestId);
  }
}
