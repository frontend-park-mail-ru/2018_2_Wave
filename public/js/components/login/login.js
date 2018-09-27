const loginTemplate = require('./login.pug');

const root = document.getElementById('root');


export default function createLogin() {
  root.innerHTML = loginTemplate();
  // пока повесил переход в меню
  // потом на проверку пользовательских данных
}
