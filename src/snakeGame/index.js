import Canvas from './utils/canvas';
import keyboardController from '../modules/keyboardController';

import busController from '../modules/busController';

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
  constructor(root, args) {
    this.snakeText = args.snakeText;
    this.DOMRect = args.snakeDOMRect;
    this.cellWidth = this.DOMRect.width / (this.snakeText.length - ' snake'.length);
    this.cellHeight = this.DOMRect.height;
    this.startX = this.DOMRect.x;
    this.startY = this.DOMRect.y;
    this.root = root;
    this.root.innerHTML = snakeTemplate();
    this.canvas = new Canvas();

    this.keyboardController = keyboardController;
    this.busController = busController;

    // for pause
    // this.paused = true;
    this.paused = false;

    this.directions = {
      Up: 'UP',
      Down: 'DOWN',
      Left: 'LEFT',
      Right: 'RIGHT',
    };

    // for pause
    this.eventsMethods = {
      Space: this.pause.bind(this),
    };


    setRequestAnimationFrame();

    this.init();
  }

  init() {
    this.userModel = new UserModel();

    this.levelModel = new LevelModel(new Size(window.innerWidth, window.innerHeight), this.cellWidth, this.cellHeight);
    this.levelController = new LevelController(this.levelModel);
    this.levelView = new LevelView(this.levelModel, this.canvas);

    this.snakeModel = new SnakeModel(this.snakeText, this.startX, this.startY);
    this.snakeController = new SnakeController(this.snakeModel, this.levelModel);
    this.snakeView = new SnakeView(this.snakeModel, this.levelModel, this.canvas);

    // this.scoreView = new ScoreView(this.snakeMOdel, this.levelModel, this.canvas);

    this.foodModel = new FoodModel();
    this.foodController = new FoodController(this.foodModel, this.levelModel);
    this.foodView = new FoodView(this.foodModel, this.levelModel, this.canvas);

    // this.canvas.setSize(new Size(this.levelModel.cellWidth * this.levelModel.getWidth() + 1,
    //  this.levelModel.cellHeight * this.levelModel.getHeight() + 33));
    this.canvas.setSize(new Size(window.innerWidth, window.innerHeight));

    this.audioController = new AudioController();

  
    // for pause
    this.update();
    this.render();

    // busController.setBusListeners(this.eventsMethods);
    busController.emit('startGame');
    this.gameLoop();
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
    // this.foodController.update();
  }

  render() {
    // this.levelView.render();
    this.snakeView.render();
    // this.foodView.render();
  }

  gameLoop() {
    this.canvas.clear();
    this.update();
    this.render();

    const fps = 10;
    if (!this.paused) {
      setTimeout(() => {
        requestAnimationFrame(this.gameLoop.bind(this));
      }, 1000 / fps);
    }
  }
}
