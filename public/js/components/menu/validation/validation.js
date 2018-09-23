import css from './validation.css';


export default function validate() {

	var usernameInput = document.getElementById('username');
	var passwordInput = document.getElementById('password');
	var passwordRepeatInput = document.getElementById('repeatPassword');

	usernameInput.CustomValidation = new CustomValidation(usernameInput);
	usernameInput.CustomValidation.validityChecks = usernameValidityChecks;

	passwordInput.CustomValidation = new CustomValidation(passwordInput);
	passwordInput.CustomValidation.validityChecks = passwordValidityChecks;

	passwordRepeatInput.CustomValidation = new CustomValidation(passwordRepeatInput);
	passwordRepeatInput.CustomValidation.validityChecks = passwordRepeatValidityChecks;


	var inputs = document.querySelectorAll('input:not([type="submit"])');

	for (var i = 0; i < inputs.length; i++) {
		inputs[i].CustomValidation.checkInput();
	}
}

function CustomValidation(input) {
	this.invalidities = [];
	this.validityChecks = [];

	//add reference to the input node
	this.inputNode = input;

	//trigger method to attach the listener
	this.registerListener();
}

CustomValidation.prototype = {

	registerListener: function() { 

		var CustomValidation = this;
		this.inputNode.addEventListener('keyup', function() {
			CustomValidation.checkInput();
		});
	},

	addInvalidity: function(message) {
		this.invalidities.push(message);
	},

	getInvalidities: function() {
		return this.invalidities.join('. \n');
	},
	
	checkValidity: function(input) {
		for ( var i = 0; i < this.validityChecks.length; i++ ) {

			var isInvalid = this.validityChecks[i].isInvalid(input);
			if (isInvalid) {
				this.addInvalidity(this.validityChecks[i].invalidityMessage);
			}

			var requirementElement = document.getElementById(this.validityChecks[i].id);

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

	checkInput: function() {
		this.inputNode.CustomValidation.invalidities = [];
		this.checkValidity(this.inputNode);

		if ( this.inputNode.CustomValidation.invalidities.length === 0 && this.inputNode.value !== '' ) {
			this.inputNode.setCustomValidity('');
		} else {
			var message = this.inputNode.CustomValidation.getInvalidities();
			this.inputNode.setCustomValidity(message);
		}
	}
};



var usernameValidityChecks = [
	{
		isInvalid: function(input) {
			return input.value.length < 3;
		},
		invalidityMessage: 'This input needs to be at least 3 characters',
		id: 'usernameMessage'
	}
];

var passwordValidityChecks = [
	{
		isInvalid: function(input) {
			return input.value.length < 8 | input.value.length > 100;
		},
		invalidityMessage: 'This input needs to be between 8 and 100 characters',
		id: 'passwordMessage'
	}
];

var passwordRepeatValidityChecks = [
	{
		isInvalid: function() {
			var passwordInput = document.getElementById('password');
			var passwordRepeatInput = document.getElementById('repeatPassword');
			return (passwordRepeatInput.value != passwordInput.value) | !passwordRepeatInput.value;
		},
		invalidityMessage: 'This password needs to match the first one',
		id: 'repeatPasswordMessage'
	}
];