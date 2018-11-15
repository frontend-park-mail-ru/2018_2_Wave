import TextInput from '../textInput/textInput';

const fieldTemplate = require('./templates/field.pug');
const invalidityMessagesTemplate = require('./templates/invalidityMessages.pug');

export default class Form {
  constructor(formData, root, busController) {
    this.formData = formData;
    this.root = root;
    this.busController = busController;
    this.fields = this.formData.fields.length;
    this.validData = [];
    this.fieldsIterator = this.getField();

    this.root.innerHtml = '';

    this.eventsMethods = {
      Text: this.validityCheck.bind(this),
    };

    this.busController.setBusListeners(this.eventsMethods);
    this.start();
  }

  * getField() {
    yield* this.formData.fields;
  }

  start() {
    this.currentField = this.fieldsIterator.next().value;
    if (this.currentField) {
      this.repeat();
    }
  }

  repeat() {
    this.root.innerHTML += fieldTemplate({
      fieldName: this.currentField.fieldName,
    });
    if (this.currentField.isSecret) {
      this.textInput = new TextInput(this.busController, true);
    } else {
      this.textInput = new TextInput(this.busController);
    }
  }

  validityCheck(data) {
    const ValidationConstructor = this.currentField.validationClass;
    const validation = new ValidationConstructor(data);
    if (validation.isValid()) {
      this.validData.push(data);
      this.start();
    } else {
      this.root.innerHTML += invalidityMessagesTemplate({
        messages: validation.getInvalidityMessages(),
      });
      this.repeat();
    }
    if (this.validData.length === this.fields) {
      this.finish();
    }
  }

  finish() {
    this.busController.removeBusListeners(this.eventsMethods);
    this.busController.emit(this.formData.formEvent, ...this.validData);
  }
}
