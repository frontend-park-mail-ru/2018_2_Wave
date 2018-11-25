import bus from './busController';

export default class swipeDetector {
  constructor(root = document) {
    this.root = root;
    this.allowedTime = 3000;
    this.threshold = 150; // required min distance traveled to be considered swipe
    this.restraint = 100;
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
    const element = e.changedTouches.item(0);
    this.startX = element.pageX;
    this.startY = element.pageY;
    this.startTime = Date.now();
    e.preventDefault();
  }

  touchMove(e) {
    // prevent scrolle
    e.preventDefault();
  }

  touchEnd(e) {
    // const element = e.changedTouches[0];
    const element = e.changedTouches.item(0);
    this.dx = element.pageX - this.startX;
    this.dy = element.pageY - this.startY;
    this.dtime = Date.now() - this.startTime;
    alert(this.dx);
    alert(this.dy);

    if (this.dtime <= this.allowedTime) {
      // if (Math.abs(this.dx) >= this.threshold && Math.abs(this.dy) <= this.restraint) { // 2nd condition for horizontal swipe met
      //   this.swipedir = (this.dx < 0) ? 'ArrowLeft' : 'ArrowRight'; // if dist traveled is negative, it indicates left swipe
      // } else if (Math.abs(this.dy) >= this.threshold && Math.abs(this.dx) <= this.restraint) { // 2nd condition for vertical swipe met
      //   this.swipedir = (this.dy < 0) ? 'ArrowUp' : 'ArrowDown'; // if dist traveled is negative, it indicates up swipe
      // }
      if (Math.abs(this.dx) > Math.abs(this.dy)) {
        this.swipeDir = (this.dx < 0) ? 'ArrowLeft' : 'ArrowRight';
        alert(this.swipeDir);
      } else {
        this.swipeDir = (this.dy < 0) ? 'ArrowUp' : 'ArrowDown';
        alert(this.swipeDir);
      }
    }

    alert(this.swipeDir);
    bus.emit(this.swipeDir);
    e.preventDefault();
  }
}
