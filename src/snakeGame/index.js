import Canvas from './utils/canvas';
import keyboardController from '../modules/keyboardController';

import busController from './utils/busController';

import setRequestAnimationFrame from './utils/setRequestAnimationFrame';

import LevelModel from './model/levelModel';
import SnakeModel from './model/snakeModel';
import FoodModel from './model/foodModel';
import UserModel from './model/userModel';
import Position from './model/position';

import LevelController from './controller/levelController';
import SnakeController from './controller/snackeController';
import FoodController from './controller/foodController';
import AudioController from './controller/audioController';

import LevelView from './view/levelView';
import SnakeView from './view/snakeView';
import FoodView from './view/foodView';

import css from './style.css';
// import Sound from './utils/sound';

import snakeTemplate from './index.pug';
import Size from './model/size';

export default class SnakeGame {
  constructor(root) {
    this.root = root;
    this.root.innerHTML = snakeTemplate();
    this.canvas = new Canvas();

    this.keyboardController = keyboardController;
    this.busController = busController;

    this.paused = true;

    this.directions = {
      Up: 'UP',
      Down: 'DOWN',
      Left: 'LEFT',
      Right: 'RIGHT',
    };

    this.eventsMethods = {
      Space: this.pause.bind(this),
    };

    setRequestAnimationFrame();

    this.init();
  }

  init() {
    this.userModel = new UserModel();

    this.levelModel = new LevelModel(new Size(60, 40), 15);
    this.levelController = new LevelController(this.levelModel);
    this.levelView = new LevelView(this.levelModel, this.canvas);

    this.snakeModel = new SnakeModel(new Position(3, 4));
    this.snakeController = new SnakeController(this.snakeModel, this.levelModel);
    this.snakeView = new SnakeView(this.snakeModel, this.levelModel, this.canvas);

    // this.scoreView = new ScoreView(this.snakeMOdel, this.levelModel, this.canvas);

    this.foodModel = new FoodModel();
    this.foodController = new FoodController(this.foodModel, this.levelModel);
    this.foodView = new FoodView(this.foodModel, this.levelModel, this.canvas);

    this.canvas.setSize(new Size(this.levelModel.cellSize * this.levelModel.getWidth() + 1,
      this.levelModel.cellSize * this.levelModel.getHeight() + 33));

    this.audioController = new AudioController();


    this.update();
    this.render();

    busController.setBusListeners(this.eventsMethods);
    busController.emit('startGame');
  }

  pause() {
    if (this.paused) {
      this.paused = false;
      this.gameLoop();
    } else {
      this.paused = true;
    }
  }

  update() {
    this.snakeController.update();
    this.foodController.update();
  }

  render() {
    this.levelView.render();
    this.snakeView.render();
    this.foodView.render();
  }

  gameLoop() {
    this.update();
    this.render();

    const fps = 5;
    if (!this.paused) {
      setTimeout(() => {
        requestAnimationFrame(this.gameLoop.bind(this));
      }, 1000 / fps);
    }
  }
}
