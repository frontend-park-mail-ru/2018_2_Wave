import BaseMenu from '../../../../game_menu/base_menu/base_menu';
import readyMessageTemplate from './ready_message.pug';
import busController from '../../../../modules/busController';
import WsPostman from '../../../../modules/wsPostman';

import './ready_message.pcss';

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

  acceptMembers() {

  }

  removeListeners() {
    busController.removeBusListeners(this.events);
  }

  quickSearchStart() {
    this.wsPostman.quickSearchAccept();
  }

  quickSearchQuit() {
    console.log('quickSearchQuit');
    this.wsPostman.quickSearchAbort();
  }

  show() {
    this.setListeners();
    this.startTimer();
    super.show();
  }

  startTimer() {
    [this.timer] = this.parent.getElementsByClassName('timer');
    this.timer.innerHTML = 30;
    this.begin = new Date().getSeconds();
    this.timerLoop();
  }

  timerLoop() {
    this.timerId = setInterval(() => {
      const now = new Date();
      const nowSeconds = now.getSeconds();
      let distance;
      if (nowSeconds > this.begin) {
        distance = this.time - (nowSeconds - this.begin);
      } else {
        distance = this.begin - nowSeconds - this.time;
      }
      console.log('timer', this.time, now.getSeconds(), this.begin, distance);
      if (!distance || distance > 30) {
        distance = 30;
      } else if (distance < 0) {
        distance = 0;
      }
      this.timer.innerHTML = distance;
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timerId);
  }

  hide() {
    super.hide();
    this.stopTimer();
  }

  close() {
    this.removeListeners();
    super.hide();
    this.stopTimer();
  }
}
