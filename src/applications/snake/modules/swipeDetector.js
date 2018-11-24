import bus from './busController';

export default class swipeDetector {
  constructor(root = document) {
    this.root = root;
    this.allowedTime = 300;
    this.threshold = 150; // required min distance traveled to be considered swipe
    this.restraint = 100;
    this.swipeDir = '';
    this.events = {
      touchstart: this.touchStart.bind(this),
      touchmove: this.touchMove.bind(this),
      touchend: this.touchEnd.bind(this),
    };
  }

  start() {
    Object.keys(this.events).forEach(
      event => this.root.addEventListener(event, this.events[event], false),
    );
  }

  stop() {
    Object.keys(this.events).forEach(
      event => this.root.removeEventListener(event, this.events[event], false),
    );
  }

  touchStart(e) {
    const element = e.e.changedTouches[0];
    this.stratX = element.pageX();
    this.startY = element.pageY();
    this.startTime = Date.now();
    e.preventDefault();
  }

  touchMove(e) {
    // prevent scrolle
    e.preventDefault();
  }

  touchEnd(e) {
    const element = e.e.changedTouches[0];
    this.dx = element.pageX() - this.stratX;
    this.dy = element.pageY() - this.stratY;

    this.dtime = Date.now() - this.startTime;
    if (this.dtime <= this.allowedTime) {
      if (Math.abs(this.dx) >= this.threshold && Math.abs(this.dy) <= this.restraint) { // 2nd condition for horizontal swipe met
        this.swipedir = (this.dx < 0) ? 'ArrowLeft' : 'ArrowRight'; // if dist traveled is negative, it indicates left swipe
      } else if (Math.abs(this.dy) >= this.threshold && Math.abs(this.dx) <= this.restraint) { // 2nd condition for vertical swipe met
        this.swipedir = (this.dy < 0) ? 'ArrowUp' : 'ArrowDown'; // if dist traveled is negative, it indicates up swipe
      }
    }
    bus.emit(this.swipeDir);
    e.preventDefault();
  }
}
