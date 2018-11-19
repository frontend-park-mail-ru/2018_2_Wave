import GameCore from './core';
import events from './events';
import busController from '../../modules/busController';

export default class OfflineGame extends GameCore {
  constructor(controller, scene) {
    super(controller, scene);

    this.state = {};
    this.gameloop = this.gameloop.bind(this);
    this.gameloopRequestId = null;
    this.lastFrame = 0;

    this.snakeText = args.snakeText;
    this.DOMRect = args.DOMRect;
    this.cellWidth = args.cellWidth;
    this.cellHeight = args.cellHeight;
    this.windowWidth = args.windowWidth;
    this.windowHeight = args.windowHeight;
    this.widthCellCount = Math.floor(this.windowWidth / this.cellWidth);
    this.heightCellCount = Math.floor(this.windowHeight / this.cellHeight);

    this.controller = controller;
    this.busController = busController;

    // for pause
    // this.paused = true;
    this.paused = false;

    // for pause
    this.eventsMethods = {
      Space: this.pause.bind(this),
    };

    this.start();
  }

  start() {
    super.start();

    this.levelModel = new LevelModel(new Size(this.widthCellCount,
      this.heightCellCount));

    this.levelController = new LevelController(this.levelModel);
    this.levelView = new LevelView(this.levelModel, this.canvas);

    this.snakeModel = new Snake(this.snakeText, this.startX, this.startY);
    this.snakeController = new SnakeController(this.snakeModel, this.levelModel);
    this.snakeView = new SnakeView(this.snakeModel, this.canvas);



    this.foodModel = new FoodModel();
    this.foodController = new FoodController(this.foodModel, this.levelModel);
    this.foodView = new FoodView(this.foodModel, this.canvas);


    this.canvas.setSize(new Size(window.innerWidth, window.innerHeight));

    this.audioController = new AudioController();

  
    // for pause
    this.update();
    this.render();

    busController.emit('startGame');
    this.gameLoop();

    setTimeout(() => {
      this.busController.emit(events.START_GAME, this.state);
    });
  }

  onGameStarted(evt) {
    this.controller.start();
    this.scene.init(evt);
    this.scene.start();

    this.lastFrame = performance.now();
    this.gameloopRequestId = requestAnimationFrame(this.gameloop);
  }

  gameloop(now) {
    const delay = now - this.lastFrame;
    this.lastFrame = now;

    this.state.bullets = this.state.bullets
      .map((bullet) => {
        bullet.percents += 0.02;
        return bullet;
      })
      .filter((bullet) => {
        if (bullet.percents >= 1 && bullet.row >= 0) {
          this.state.items[bullet.row * 5 + bullet.coll].fadeSpeed = rand(10, 20) / 1000;
          return false;
        }

        return bullet.percents < 1;
      });

    this.state.items = this.state.items.map((item) => {
      if (item.fadeSpeed) {
        item.fadeLevel += item.fadeSpeed;
      }

      if (item.fadeLevel >= 1) {
        item.dead = true;
      }

      return item;
    });

    bus.emit(events.GAME_STATE_CHANGED, this.state);

    if (!this.state.items.find(item => !item.dead)) {
      setTimeout(() => {
        bus.emit(events.FINISH_GAME);
      });
    }

    this.gameloopRequestId = requestAnimationFrame(this.gameloop);
  }

  onControllsPressed(evt) {

  }

  onGameFinished(evt) {
    cancelAnimationFrame(this.gameloopRequestId);

    this.busCOntroller.emit('CLOSE_GAME');
  }

  onGameStateChanged(evt) {
    this.scene.setState(evt);
  }
}
