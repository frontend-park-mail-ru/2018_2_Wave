const loginTemplate = require('./login.pug');

const root = document.getElementById('root');

import AjaxModule from '../../modules/ajax';

export default function createLogin() {
  root.innerHTML = loginTemplate();
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', (event) => {
    console.log('submit');
    event.preventDefault();

    // похоже, что formdata пока не особо работает
    // пока выпилию её, так как без поняти, что это 
    //const formData = new FormData(loginForm);
    //console.log(formData);

  const email = document.getElementById('usernameInput').value;
  const password = document.getElementById('passwordInput').value;
  console.log(email, password, "doAjax");

    AjaxModule.doPost({
      callback (xhr) {
        alert("you are login");
        console.log(xhr);
      },
      path: '/login',
      body: {
        email,
        password,
      },
    });


  });

  // пока повесил переход в меню
  // потом на проверку пользовательских данных
}
