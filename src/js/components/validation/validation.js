import './validation.css';


function isValid() {
  const inputs = document.querySelectorAll('input:not([type="submit"])');
  let flag = true;
  for (let i = 0; i < inputs.length; i += 1) {
    if (inputs[i].CustomValidation.invalidities.length > 0) {
      flag = false;
    }
  }
  return flag;
}

function CustomValidation(input) {
  this.invalidities = [];
  this.validityChecks = [];

  // add reference to the input node
  this.inputNode = input;

  // trigger method to attach the listener
  this.registerListener();
}

const usernameValidityChecks = [
  {
    isInvalid(input) {
      return !input.value.match(/^\S{4,}$/);
    },
    invalidityMessage: 'This input needs to be at least 4 characters',
    id: 'usernameMessage',
  },
];

const passwordValidityChecks = [
  {
    isInvalid(input) {
      return !input.value.match(/^\S{6,}$/);
    },
    invalidityMessage: 'This input needs to be at least 6 characters',
    id: 'passwordMessage',
  },
];

const passwordRepeatValidityChecks = [
  {
    isInvalid() {
      const passwordInput = document.getElementById('passwordInput');
      const passwordRepeatInput = document.getElementById('repeatPasswordInput');
      return (passwordRepeatInput.value !== passwordInput.value) || !passwordRepeatInput.value;
    },
    invalidityMessage: 'Passwords must match',
    id: 'repeatPasswordMessage',
  },
];


const passwordEditValidityChecks = [
  {
    isInvalid(input) {
      return !input.value.match(/^$|^\S{4,}$/);
    },
    invalidityMessage: 'This input needs to be at least 4 characters',
    id: 'passwordMessage',
  },
];

const passwordRepeatEditValidityChecks = [
  {
    isInvalid() {
      const passwordInput = document.getElementById('passwordInput');
      const passwordRepeatInput = document.getElementById('repeatPasswordInput');
      return (passwordRepeatInput.value !== passwordInput.value);
    },
    invalidityMessage: 'Passwords must match',
    id: 'repeatPasswordMessage',
  },
];

function validate() {
  const usernameInput = document.getElementById('usernameInput');
  const passwordInput = document.getElementById('passwordInput');
  const passwordRepeatInput = document.getElementById('repeatPasswordInput');

  usernameInput.CustomValidation = new CustomValidation(usernameInput);
  usernameInput.CustomValidation.validityChecks = usernameValidityChecks;

  passwordInput.CustomValidation = new CustomValidation(passwordInput);
  passwordInput.CustomValidation.validityChecks = passwordValidityChecks;

  passwordRepeatInput.CustomValidation = new CustomValidation(passwordRepeatInput);
  passwordRepeatInput.CustomValidation.validityChecks = passwordRepeatValidityChecks;

  const inputs = document.querySelectorAll('input:not([type="submit"])');

  for (let i = 0; i < inputs.length; i += 1) {
    inputs[i].CustomValidation.checkInput();
  }
}

function validateEdit() {
  const usernameInput = document.getElementById('usernameInput');
  const passwordInput = document.getElementById('passwordInput');
  const passwordRepeatInput = document.getElementById('repeatPasswordInput');

  usernameInput.CustomValidation = new CustomValidation(usernameInput);
  usernameInput.CustomValidation.validityChecks = usernameValidityChecks;

  passwordInput.CustomValidation = new CustomValidation(passwordInput);
  passwordInput.CustomValidation.validityChecks = passwordEditValidityChecks;

  passwordRepeatInput.CustomValidation = new CustomValidation(passwordRepeatInput);
  passwordRepeatInput.CustomValidation.validityChecks = passwordRepeatEditValidityChecks;

  const inputs = document.querySelectorAll('input:not([type="submit"])');

  for (let i = 0; i < inputs.length; i += 1) {
    inputs[i].CustomValidation.checkInput();
  }
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
    for (let i = 0; i < this.validityChecks.length; i += 1) {
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

export {
  validate,
  isValid,
  validateEdit,
};
