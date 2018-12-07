import busController from '../../modules/busController';
import Game from '../game';

import SnakeGameTemplate from '../templates/snakegame.pug';

import Element from '../../../element';

export default class GameView extends Element {
  constructor(parent) {
    super(SnakeGameTemplate, parent, 'snakegame-container');
  }

  // initGame(mode) {
  //   this.show();
  //   console.log('init', mode);
  //   this.gameInitData = {
  //     snakeText: 'qwertyuiopqe',
  //     DOMRect: {
  //       x: 10,
  //       y: 10,
  //       width: 9,
  //       height: 9,
  //     },
  //     // windowWidth: window.innerWidth,
  //     // windowHeight: window.innerHeight,
  //     windowWidth: 50,
  //     windowHeight: 50,
  //   };


  //   // if (navigator.onLine) {
  //   if (false) {
  //     this.mode = GAME_MODES.ONLINE;
  //     this.wsMessage.addToRoom();
  //     this.startGame = this.startGame.bind(this);
  //     busController.setBusListeners({ STATUS_OK: this.startGame });
  //     busController.setBusListeners({ data: this.setUserToken.bind(this) });
  //   } else {
  //     this.mode = GAME_MODES.OFFLINE;
  //     this.game = new Game(this.mode, this.env.getCanvas(), this.gameInitData);
  //     // TODO: FIXME: call this in view after button press!
  //     this.game.start();
  //   }
  // }


  show() {
    super.show();
    this.startGame(this.gameParams);
  }

  render(gameParams) {
    this.gameParams = gameParams;
    super.render();
  }

  startGame(gameParams) {
    // if (!this.gameParams) {
    //   busController.emit('link', '/mainmenu');
    //   return;
    // }

    if (!gameParams) {
      this.gameParams = {
        mode: 'CLASSIC',
        type: 'SINGLPLAYER',
      };
    }

    this.gameParams.onLine = navigator.onLine;

    const [canvasWrapper] = this.wrapper.getElementsByClassName('canvas-wrapper');
    this.gameInitData = {
      snakeText: 'qwertyuiopqe',
      DOMRect: {
        x: 10,
        y: 10,
        width: 15,
        height: 15,
      },
      userToken: this.userToken,
      windowWidth: canvasWrapper.clientWidth,
      windowHeight: canvasWrapper.clientHeight,
      widthCellCount: 60,
      heightCellCount: 40,
    };

    console.log('game params:', this.gameInitData);
    const [canvas] = this.wrapper.getElementsByClassName('snakegame-canvas');
    this.game = new Game(this.gameParams, canvas, this.gameInitData);
    this.game.start();
  }

  hide() {
    super.hide();
  }

  // startGame() {
  //   this.gameInitData = {};
  //   busController.removeBusListeners({ data: this.startGame });
  //   this.wsMessage.startGame();
  //   this.statusTick = this.statusTick.bind(this);
  //   busController.setBusListeners({ STATUS_TICK: this.statusTick });
  // }

  // statusTick(payload) {
  //   busController.removeBusListeners({ STATUS_TICK: this.statusTick });
  //   this.gameInitData.payload = payload;
  //   this.gameInitData = {
  //     snakeText: 'qwertyuiopqe',
  //     DOMRect: {
  //       x: 10,
  //       y: 10,
  //       width: 6,
  //       height: 6,
  //     },
  //     userToken: this.userToken,
  //     windowWidth: payload.scene_size.X * 6,
  //     windowHeight: payload.scene_size.Y * 6,
  //   };

  //   this.game = new Game(this.mode, this.gameContainer, this.gameInitData);
  //   this.game.start();
  // }

  // handleWsMessage(data) {

  // }
}
