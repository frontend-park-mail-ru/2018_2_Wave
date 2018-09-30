import {validate, isValid} from '../validation/validation';
// рабочая функция isValid

const registerTemplate = require('./register.pug');

const root = document.getElementById('root');


export default function createRegister() {
  root.innerHTML = registerTemplate();
  
  // нужно запустить один раз в самом начале
  // дальше все само делает
  validate();
}
