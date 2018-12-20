import bus from './busController';
import swipeDetector from './swipeDetector';
import config from '../game/utils/game_config';

let enter = 0;
class KeyboardController {
  constructor() {
    if (window.innerWidth > window.innerHeight) {
      this.orientation = config.HORIZONTAL;
    } else {
      this.orientation = config.VERTICAL;
    }

    this.controls = [
      8, // backspace
      // 9, // tab
      13, // enter
      // 27, // esc
      // 16, // shift
      // 32, // space
      83, // s turn off the music
      81, // q exit
      84, // t key (change theme)
    ];

    this.snakeControls = [
      37, // left arrow
      38, // up arrow
      39, // right arrow
      40, // down arrow
    ];

    this.lastCommand = undefined;

    this.ctrlControl = [
      67, // ctrl+c

    ];

    this.verticalDirection = {
      ArrowUp: 'ArrowLeft',
      ArrowDown: 'ArrowRight',
      ArrowLeft: 'ArrowUp',
      ArrowRight: 'ArrowDown',
    };

    this.swipeDetector = swipeDetector;
    this.isSpace = false;
    this.acceptInput = this.acceptInput.bind(this);
  }

  start() {
    // magic here
    // console.log('start keyboard');
    // setTimeout(() => document.addEventListener('keydown', this.acceptInput), 1000);
    enter = 0;
    setTimeout(() => { enter += 1; }, 1000);
    document.addEventListener('keydown', this.acceptInput);
    this.swipeDetector.start();
  }

  setOrintation(orientation) {
    this.orientation = orientation;
    this.lastCommand = undefined;
  }

  stop() {
    document.removeEventListener('keydown', this.acceptInput);
    this.swipeDetector.stop();
  }

  isControlKey(keyCode) {
    return (this.controls.indexOf(keyCode) > -1);
  }

  isCommand() {
    return (this.lastCommand || this.swipeDetector.lastCommand);
  }

  getLastCommand() {
    if (this.lastCommand) {
      const temp = this.lastCommand;
      this.lastCommand = undefined;
      return temp;
    }

    if (this.swipeDetector.isCommand()) {
      return this.swipeDetector.getLastCommand();
    }
    return undefined;
  }

  getSpace() {
    if (this.isSpace) {
      this.isSpace = false;
      return true;
    }
    return false;
  }

  isSnakeControls(keyCode) {
    return (this.snakeControls.indexOf(keyCode) > -1);
  }

  /*
  isInputKey(keyCode) {
    return (keyCode >= 48 && keyCode <= 90
      || keyCode >= 96 && keyCode <= 111
      || keyCode >= 186 && keyCode <= 222);
  }
  */

  /*
  isCtrlControl(keyCode) {
    return (this.ctrlControl.indexOf(keyCode) > -1);
  }
  */

  acceptInput(e) {
    let keyCode =  e.which || e.keyCode;

    /*
    if (e.ctrlKey) {
      if (this.isCtrlControl(keyCode)) {
        e.preventDefault();
        bus.emit(`Ctrl+${e.key}`, e.key);
      }
      return;
    }
    */

    /*
    if (this.isInputKey(e.keyCode)) {
      e.preventDefault();
      bus.emit('Input', e.key);
      return;
    }
    */

    if (keyCode === 13 && enter === 0) {
      enter += 1;
      keyCode = -1;
    }

    if (this.isControlKey(keyCode)) {
      bus.emit(e.code);
    } else if (this.isSnakeControls(keyCode)) {
      let direction = e.key;
      if (this.orientation === config.VERTICAL) {
        direction = this.verticalDirection[direction];
      }
      bus.emit(e.code);
      this.lastCommand = direction;
    }

    if (e.code === 'Space') {
      this.isSpace = true;
    }
  }
}

const keyboardController = new KeyboardController();
export default keyboardController;
