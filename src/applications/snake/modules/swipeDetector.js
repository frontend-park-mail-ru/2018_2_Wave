import config from '../game/utils/game_config';
import bus from '../../../modules/bus';

class SwipeDetector {
  constructor() {
    this.root = document;
    if (window.innerWidth > window.innerHeight) {
      this.otientation = config.HORIZONTAL;
    } else {
      this.otientation = config.VERTICAL;
    }
    this.allowedTime = 3000;
    this.threshold = 150; // required min distance traveled to be considered swipe
    this.restraint = 100;
    this.clickTime = 100;
    this.events = {
      touchstart: this.touchStart.bind(this),
      touchmove: this.touchMove.bind(this),
      touchend: this.touchEnd.bind(this),
    };
    this.lastCommand = undefined;
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


  isCommand() {
    return this.lastCommand;
  }

  getLastCommand() {
    const temp = this.lastCommand;
    this.lastCommand = undefined;
    return temp;
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

    if ((e.target instanceof HTMLAnchorElement)
    && (e.target.getAttribute('type') !== 'submit')) {
      e.preventDefault();
      bus.emit('link', e.target.pathname, e.target.search);
    }

    if (this.dtime <= this.allowedTime) {
      if (Math.abs(this.dx) > Math.abs(this.dy)) {
        if (this.orientation === config.HORIZONTAL) {
          this.swipeDir = (this.dx < 0) ? 'ArrowLeft' : 'ArrowRight';
        } else {
          this.swipeDir = (this.dx < 0) ? 'ArrowUp' : 'ArrowDown';
        }
      } else  if (this.orientation === config.HORIZONTAL) {
        this.swipeDir = (this.dy < 0) ? 'ArrowUp' : 'ArrowDown';
      } else {
        this.swipeDir = (this.dy < 0) ? 'ArrowLeft' : 'ArrowRight';
      }
    }

    this.lastCommand = this.swipeDir;
    e.preventDefault();
  }
}

const swipeDetector = new SwipeDetector();
export default swipeDetector;
