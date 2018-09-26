import createMenu from '../menu/menu';
import addButtonListener from '../addbuttonlistener';
import createLogin from '../login/login';
import validate from '../validation/validation';

import registerTemplate from './register.pug';


export default function createRegister() {
  root.innerHTML = registerTemplate();

  validate();
  addButtonListener('registerButton', createMenu);
  addButtonListener('loginButton', createLogin);

  console.log('register block created');
}
