import AjaxModule from '../../modules/ajax';

const loginTemplate = require('./login.pug');

const root = document.getElementById('root');


export default function createLogin() {
  root.innerHTML = loginTemplate();
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', (event) => {
    console.log('submit catched');
    event.preventDefault();

    const formData = new FormData(loginForm);

    AjaxModule.doPost({
      path: '/login',
      body: formData,
    });
  });
}
