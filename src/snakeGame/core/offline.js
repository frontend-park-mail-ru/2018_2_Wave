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
    this.root = args.root;
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

  start() {
    super.start();
    this.state = {
      bullets: [],
      me: {
        coll: 2,
      },
    };

    this.state.items = Array.from(new Array(3 * 5), (_, position) => ({
      coll: position % 5,
      row: position < 5 ? 0 : (position / 5) | 0,
      dead: false,
      fadeSpeed: 0,
      fadeLevel: 0,
    }));

    setTimeout(() => {
      bus.emit(events.START_GAME, this.state);
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

    bus.emit('CLOSE_GAME');
  }

  onGameStateChanged(evt) {
    this.scene.setState(evt);
  }
}
