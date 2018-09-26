import css from './validation.css';


export default function validate() {
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const passwordRepeatInput = document.getElementById('repeatPassword');

  usernameInput.CustomValidation = new CustomValidation(usernameInput);
  usernameInput.CustomValidation.validityChecks = usernameValidityChecks;

  passwordInput.CustomValidation = new CustomValidation(passwordInput);
  passwordInput.CustomValidation.validityChecks = passwordValidityChecks;

  passwordRepeatInput.CustomValidation = new CustomValidation(passwordRepeatInput);
  passwordRepeatInput.CustomValidation.validityChecks = passwordRepeatValidityChecks;


  const inputs = document.querySelectorAll('input:not([type="submit"])');

  for (let i = 0; i < inputs.length; i++) {
    inputs[i].CustomValidation.checkInput();
  }
}

function CustomValidation(input) {
  this.invalidities = [];
  this.validityChecks = [];

  // add reference to the input node
  this.inputNode = input;

  // trigger method to attach the listener
  this.registerListener();
}

CustomValidation.prototype = {

  registerListener() {
    const CustomValidation = this;
    this.inputNode.addEventListener('keyup', () => {
      CustomValidation.checkInput();
    });
  },

  addInvalidity(message) {
    this.invalidities.push(message);
  },

  getInvalidities() {
    return this.invalidities.join('. \n');
  },

  checkValidity(input) {
    for (let i = 0; i < this.validityChecks.length; i++) {
      const isInvalid = this.validityChecks[i].isInvalid(input);
      if (isInvalid) {
        this.addInvalidity(this.validityChecks[i].invalidityMessage);
      }

      const requirementElement = document.getElementById(this.validityChecks[i].id);

      if (requirementElement) {
        if (isInvalid) {
          requirementElement.classList.add('invalid');
          requirementElement.classList.remove('valid');
        } else {
          requirementElement.classList.remove('invalid');
          requirementElement.classList.add('valid');
        }
      }
    }
  },

  checkInput() {
    this.inputNode.CustomValidation.invalidities = [];
    this.checkValidity(this.inputNode);

    if (this.inputNode.CustomValidation.invalidities.length === 0 && this.inputNode.value !== '') {
      this.inputNode.setCustomValidity('');
    } else {
      const message = this.inputNode.CustomValidation.getInvalidities();
      this.inputNode.setCustomValidity(message);
    }
  },
};


var usernameValidityChecks = [
  {
    isInvalid(input) {
      return input.value.length < 3;
    },
    invalidityMessage: 'This input needs to be at least 3 characters',
    id: 'usernameMessage',
  },
];

var passwordValidityChecks = [
  {
    isInvalid(input) {
      return input.value.length < 8 | input.value.length > 100;
    },
    invalidityMessage: 'This input needs to be between 8 and 100 characters',
    id: 'passwordMessage',
  },
];

var passwordRepeatValidityChecks = [
  {
    isInvalid() {
      const passwordInput = document.getElementById('password');
      const passwordRepeatInput = document.getElementById('repeatPassword');
      return (passwordRepeatInput.value != passwordInput.value) | !passwordRepeatInput.value;
    },
    invalidityMessage: 'This password needs to match the first one',
    id: 'repeatPasswordMessage',
  },
];
