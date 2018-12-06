import busController from '../../modules/busController';
import Game from '../game';

import SnakeGameTemplate from '../templates/snakegame.pug';

import Element from '../../../element';

export default class GameView extends Element {
  constructor(parent) {
    super(SnakeGameTemplate, parent, 'snakegame-container');

    this.events = {
      MENU_CLASSIC: this.initGame.bind(this),
    };

    this.setBusListeners();
  }

  setBusListeners() {
    busController.setBusListeners(this.events);
  }

  initGame(mode) {
    this.show();
    console.log('init', mode);
    this.gameInitData = {
      snakeText: 'qwertyuiopqe',
      DOMRect: {
        x: 10,
        y: 10,
        width: 18,
        height: 18,
      },
      // windowWidth: window.innerWidth,
      // windowHeight: window.innerHeight,
      windowWidth: 800,
      windowHeight: 500,
    };


    // if (navigator.onLine) {
    if (false) {
      this.mode = GAME_MODES.ONLINE;
      this.wsMessage.addToRoom();
      this.startGame = this.startGame.bind(this);
      busController.setBusListeners({ STATUS_OK: this.startGame });
      busController.setBusListeners({ data: this.setUserToken.bind(this) });
    } else {
      this.mode = GAME_MODES.OFFLINE;
      this.game = new Game(this.mode, this.env.getCanvas(), this.gameInitData);
      // TODO: FIXME: call this in view after button press!
      this.game.start();
    }
  }


  show() {
    super.show();
  }

  render(gameParams) {
    super.render();

    this.gameInitData = {
      snakeText: 'qwertyuiopqe',
      DOMRect: {
        x: 10,
        y: 10,
        width: 6,
        height: 6,
      },
      userToken: this.userToken,
      windowWidth: 800,
      windowHeight: 800,
    };

    console.log('game params:', gameParams);
    const [canvas] = this.wrapper.getElementsByClassName('snakegame-canvas');
    this.game = new Game(gameParams, canvas, this.gameInitData);
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
