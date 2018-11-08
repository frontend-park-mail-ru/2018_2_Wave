export default class Validation {
  constructor(value, validityChecks) {
    this.value = value;
    this.validityChecks = validityChecks;
    this.invalidityMessages = [];
    this.checkValidity();
  }

  checkValidity() {
    this.validityChecks.forEach((validityCheck) => {
      if (!validityCheck.isValid(this.value)) {
        this.invalidityMessages.push(validityCheck.invalidityMessage);
      }
    });
  }

  getInvalidityMessages() {
    return this.invalidityMessages;
  }

  isValid() {
    return this.invalidityMessages.length === 0;
  }
}
