import BaseMenu from '../../../../game_menu/base_menu/base_menu';
import readyMessageTemplate from './ready_message.pug';
import busController from '../../../../modules/busController';
import WsPostman from '../../../../modules/wsPostman';

import style from './ready_message.css';

export default class ReadyMessage extends BaseMenu {
  constructor(time) {
    const [parent] = document.getElementsByClassName('canvas-wrapper');
    super(readyMessageTemplate, parent, ['ready-message-wrapper'], true, 'ready-menu');
    this.parent = parent;
    this.time = time;
    this.fullClose = false;
    this.wsPostman = new WsPostman();
    super.render();

    this.events = {
      QUICKSEARCH_START:  this.quickSearchStart.bind(this),
      QUICKSEARCH_QUIT:   this.quickSearchQuit.bind(this),
      quick_search_accept_status: this.acceptMembers.bind(this),
    };
    super.hide();
  }

  setListeners() {
    busController.setBusListeners(this.events);
  }

  removeListeners() {
    busController.removeBusListeners(this.events);
  }

  quickSearchStart() {
    this.wsPostman.quickSearchAccept();
  }

  quickSearchQuit() {
    this.wsPostman.quickSearchAbort();
  }

  quickSearchQuit(message) {
    console.log('accepted', message.payload);
  }

  acceptMembers() {

  }

  show() {
    this.setListeners();
    this.startTimer();
    super.show();
  }

  startTimer() {
    [this.timer] = this.parent.getElementsByClassName('timer');
    this.begin = new Date().getSeconds();
    this.timerLoop();
  }

  timerLoop() {
    this.timerId = setInterval(() => {
      const now = new Date();
      const distance = this.time - (now.getSeconds() - this.begin);
      this.timer.innerHTML = distance;
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timerId);
  }

  hide() {
    if (this.fullClose) {
      this.removeListeners();
    }
    super.hide();
    this.stopTimer();
  }
}
