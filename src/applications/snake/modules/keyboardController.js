import bus from './busController';
import swipeDetector from './swipeDetector';

class KeyboardController {
  constructor() {
    this.controls = [
      // 8, // backspace
      // 9, // tab
      13, // enter
      // 27, // esc
      // 16, // shift
      32, // space
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

    this.swipeDetector = swipeDetector;
  }

  start() {
    document.addEventListener('keydown', this.acceptInput.bind(this));
    this.swipeDetector.start();
  }

  stop() {
    document.removeEventListener('keydown', this.acceptInput.bind(this));
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
    const keyCode =  e.which || e.keyCode;

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

    if (this.isControlKey(keyCode)) {
      bus.emit(e.code);
    } else if (this.isSnakeControls(keyCode)) {
      bus.emit(e.code);
      this.lastCommand = e.key;
    }
  }
}

const keyboardController = new KeyboardController();
export default keyboardController;
