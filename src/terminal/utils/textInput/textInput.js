export default class TextInput {
  constructor(busController, isSecret = false) {
    this.busController = busController;
    this.isSecret = isSecret;
    this.textInputControllers = {
      Input: this.addText.bind(this),
      Tab: this.addTub.bind(this),
      Backspace: this.cutText.bind(this),
      Enter: this.enterText.bind(this),
    };
    this.textElement = this.getTextElement();

    this.busController.setBusListeners(this.textInputControllers);
  }

  getBell(root = document) {
    return this.getLast(root.getElementsByClassName('bell'));
  }

  removeBell() {
    const bell = this.getBell();
    if (bell) {
      bell.remove();
    }
  }

  getLast(array) {
      return array[array.length - 1];
  }


  getTextElement(root = document) {
    return this.getLast(root.getElementsByClassName('text'));
  }

  getText() {
    if (this.isSecret) {
      return this.textElement.getAttribute('text');
    }
    return this.textElement.innerText;
  }

  cutText() {
    this.textElement.innerText = this.textElement.innerText.slice(0, -1);
  }

  setText(text) {
    this.textElement.innerText = text;
  }

  addText(string) {
    if (this.isSecret) {
      let textAttribute = this.textElement.getAttribute('text');
      if (!textAttribute) {
        textAttribute = '';
      }

      this.textElement.setAttribute('text', `${textAttribute}${string}`);
      this.textElement.innerText += '*'.repeat(string.length);
    } else {
      this.textElement.innerText += string;
    }
  }

  addTub() {
    this.addText('\t');
  }

  enterText() {
    this.removeBell();
    this.busController.removeBusListeners(this.textInputControllers);
    this.busController.emit('Text', this.getText());
  }
}
