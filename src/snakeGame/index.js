import Canvas from './utils/canvas';
import keyboardController from '../modules/keyboardController';

import busController from '../modules/busController';

import setRequestAnimationFrame from './utils/setRequestAnimationFrame';

import LevelModel from './model/levelModel';
import SnakeModel from './model/snakeModel';
import FoodModel from './model/foodModel';
import UserModel from './model/userModel';

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
  constructor(args) {
    this.snakeText = args.snakeText;
    this.DOMRect = args.DOMRect;
    console.log(args);
    console.log(this.DOMRect);
    this.cellWidth = args.cellWidth;
    this.cellHeight = args.cellHeight;
    this.windowWidth = args.windowWidth;
    this.windowHeight = args.windowHeight;
    this.widthCellCount = Math.floor(this.windowWidth / this.cellWidth);
    this.heightCellCount = Math.floor(this.windowHeight / this.cellHeight);
    this.root = args.root;
    this.root.innerHTML = snakeTemplate();
    this.canvas = new Canvas();

    console.log('this.cellWidth', this.cellWidth);
    console.log('this.cellHeight', this.cellHeight);
    console.log('this.windowWidth', this.windowWidth);
    console.log('this.windowHeight', this.windowHeight);
    console.log('this.widthCellCount', this.widthCellCount);
    console.log('this.heightCellCount', this.heightCellCount);

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

    this.levelModel = new LevelModel(new Size(this.widthCellCount,
      this.heightCellCount),
      this.cellWidth,
      this.cellHeight);

    
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

    busController.setBusListeners(this.eventsMethods);
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
    this.foodController.update();
  }

  render() {
    // this.levelView.render();
    this.snakeView.render();
    this.foodView.render();
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
