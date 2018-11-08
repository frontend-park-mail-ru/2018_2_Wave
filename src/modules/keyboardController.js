import bus from './bus';

class KeyboardController {
  constructor() {
    this.controls = [
      8, // backspace
      9, // tab
      13, // enter
      // 16, // shift
      32, //space
      37, // left arrow
      38, // up arrow
      39, // right arrow
      40, // down arrow
    ];

    this.ctrlControl = [
      67, // ctrl+c

    ];

    document.addEventListener('keydown', this.acceptInput.bind(this));
  }

  isControlKey(keyCode) {
    return (this.controls.indexOf(keyCode) > -1);
  }

  isInputKey(keyCode) {
    return (keyCode >= 48 && keyCode <= 90 
      || keyCode >= 96 && keyCode <= 111
      || keyCode >= 186 && keyCode <= 222);
  }

  isCtrlControl(keyCode) {
    return (this.ctrlControl.indexOf(keyCode) > -1);
  }

  acceptInput(e) {
    const keyCode =  e.which || e.keyCode;

    if (e.ctrlKey) {
      if (this.isCtrlControl(keyCode)) {
        e.preventDefault();
        bus.emit(`Ctrl+${e.key}`, e.key);
      }
      return;
    }

    if (this.isInputKey(e.keyCode)) {
      e.preventDefault();
      bus.emit('Input', e.key);
      return;
    }

    if (this.isControlKey(e.keyCode)) {
      e.preventDefault();
      if (e.keyCode === 32) { // space
        bus.emit(e.code);
      } else {
        bus.emit(e.key);
      }
    }
  }
}

const keyboardController = new KeyboardController();
export default keyboardController;
