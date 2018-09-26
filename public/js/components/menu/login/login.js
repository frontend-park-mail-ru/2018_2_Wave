import createRegister from '../register/register';
import createMenu from '../menu/menu';
import addButtonListener from '../addbuttonlistener';

import loginTemplate from './login.pug';


export default function createLogin() {
  root.innerHTML = loginTemplate();
  // пока повесил переход в меню
  // потом на проверку пользовательских данных
  addButtonListener('loginButton', createMenu);

  addButtonListener('registerButton', createRegister);
}
