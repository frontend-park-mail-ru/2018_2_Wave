const registerTemplate = require('./register.pug');

const root = document.getElementById('root');


export default function createRegister() {
  root.innerHTML = registerTemplate();

  validate();

  console.log('register block created');
}
