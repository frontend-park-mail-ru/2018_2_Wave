import WsPostman from '../../../modules/wsPostman';
import GAME_MODE from '../modes';
import Loader from './loader/loader';
import busController from '../../../modules/busController';
import ReadyMessage from './ready_message/ready_message';

export default class WaitingPlayers {
  constructor(canvas, gameParams, gameInfo) {
    this.canvas = canvas;
    this.gameParams = gameParams;
    this.gameInfo = gameInfo;
    this.loader = new Loader(this.canvas, this.gameParams);

    this.events = {
      quick_search_status: this.updateTable.bind(this),
      quick_search_ready: this.quickSearchReady.bind(this),
    };
  }

  setBusListeners() {
    busController.setBusListeners(this.events);
  }

  removeBusListeners() {
    busController.removeBusListeners(this.events);
  }

  start() {
    this.setBusListeners();
    this.quickSearchStart();
    this.setEnviroment();
    this.loader.start();
  }

  quickSearchStart() {
    this.wsPostman = new WsPostman();
    let players;
    switch (this.gameInfo.type) {
      case GAME_MODE.FOUR_PLAYERS:
        players = 4;
        break;
      case GAME_MODE.THREE_PLAYERS:
        players = 3;
        break;
      case GAME_MODE.TWO_PLAYERS:
        players = 2;
        break;
      default:
        players = 1;
        break;
    }
    this.wsPostman.addToQuickSearchRoom(players);
  }

  quickSearchReady(message) {
    this.readyMessage = new ReadyMessage(message.payload.accept_timeout);
    this.readyMessage.show();
  }

  setEnviroment() {
    this.canvas.width = this.gameParams.windowWidth;
    this.canvas.height = this.gameParams.windowHeight;

    [this.container] = document.getElementsByClassName('snakegame-container__multiplayer');

    [this.canvas] = this.container.getElementsByClassName('snakegame-canvas');
    this.canvas.classList.remove('game-board__purple');

    [this.score] = this.container.getElementsByClassName('main-score');
    this.score.hidden = true;

    [this.name] = this.container.getElementsByClassName('game_mode');
    this.name.innerHTML = 'WAITING FOR PLAYERS';
  }

  updateTable(message) {
    console.log('wait player');
    this.players = document.getElementsByClassName('player');
    message.payload.members.forEach((member) => {
      [this.member] = document.querySelectorAll(`[user_serial="${member.user_serial}"]`);
      [this.player] = this.member.getElementsByClassName('player');
      // this.player.innerHTML = member.user_serial;
      this.player.innerHTML = 'newPlayer';

      [this.score] = this.member.getElementsByClassName('score');
      this.score.innerHTML = 0;
    });
  }

  stop() {
    this.loader.stop();
    this.readyMessage.close();
    this.removeBusListeners();
  }
}
