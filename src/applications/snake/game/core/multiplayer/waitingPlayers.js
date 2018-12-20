import WsPostman from '../../../modules/wsPostman';
import GAME_MODE from '../modes';
import Loader from './loader/loader';
import busController from '../../../modules/busController';
import ReadyMessage from './ready_message/ready_message';
import ErrorMessage from '../../../error_message/errorMessage';
import config from '../../../modules/view_config';

export default class WaitingPlayers {
  constructor(canvas, gameParams, gameInfo) {
    this.canvas = canvas;
    this.gameParams = gameParams;
    this.gameInfo = gameInfo;
    this.loader = new Loader(this.canvas, this.gameParams);
    this.errorMessage = new ErrorMessage();

    this.updateTable = this.updateTable.bind(this);
    this.quickSearchReady = this.quickSearchReady.bind(this);
    this.removed = this.removed.bind(this);
    this.kick = this.kick.bind(this);
    this.acceptStatus = this.acceptStatus.bind(this);
    this.hideReadyMesage = this.hideReadyMesage.bind(this);
    this.events = {
      quick_search_added: this.updateTable,
      // quick_search_accept_status: this.acceptStatus,
      quick_search_ready: this.quickSearchReady,
      quick_search_removed: this.removed,
      quick_search_kick: this.kick,
      QUICKSEARCH_START: this.hideReadyMesage,
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
    this.loader.start(this.canvas);
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
    this.loader.hideTimer();
    this.readyMessage = new ReadyMessage(message.payload.accept_timeout);
    this.readyMessage.show();
  }

  kick(message) {
    this.errorMessage.setErrorMessage('You were kiked from the room');
    busController.emit('link', '/snake');
  }

  hideReadyMesage() {
    this.readyMessage.hide();
    this.loader.showTimer();
  }

  acceptStatus() {
    this.readyMessage.hide();
  }

  setEnviroment() {
    [this.container] = document.getElementsByClassName('snakegame-container__multiplayer');

    [this.canvas] = this.container.getElementsByClassName('snakegame-canvas');
    this.canvas.classList.remove(config.gameCanvasBorder);

    [this.score] = this.container.getElementsByClassName('main-score');
    this.score.hidden = true;

    [this.game_mode] = this.container.getElementsByClassName('game_mode');
    this.temp_mode = this.game_mode.innerHTML;
    this.game_mode.innerHTML = 'WAITING FOR PLAYERS';

    this.canvas.width = this.gameParams.windowWidth * 0.99;
    this.canvas.height = this.gameParams.windowHeight * 0.99;
  }

  removeEnviroment() {
    this.canvas.classList.add(config.gameCanvasBorder);
    this.score.hidden = false;
    this.game_mode.innerHTML = this.temp_mode;
  }

  removed(message) {
    this.loader.showTimer();
    this.errorMessage.setErrorMessage('Player left the room');
    this.updateTable(message);
    this.readyMessage.hide();
  }

  updateTable(message) {
    const playersCollection = document.getElementsByClassName('players');
    this.players = Array.prototype.slice.call(playersCollection);
    message.payload.members.forEach((member) => {
      this.player = playersCollection.item(member.user_serial);
      this.players.splice(this.players.indexOf(this.player), 1);
      [this.playerName] = this.player.getElementsByClassName('player');
      this.player.hidden = false;
      if (member.user_name) {
        this.playerName.innerHTML = `player${member.user_name}`;
      } else {
        this.playerName.innerHTML = `player${member.user_serial}`;
      }
    });

    this.players.forEach(player => player.hidden = true);
  }

  stop() {
    this.removeEnviroment();
    this.loader.stop();
    this.wsPostman.quickSearchAbort();
    if (this.readyMessage) {
      this.readyMessage.close();
    }
    this.removeBusListeners();
  }
}
