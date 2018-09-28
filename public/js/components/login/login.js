require('../../modules/ajax');
const loginTemplate = require('./login.pug');

const root = document.getElementById('root');


export default function createLogin() {
  root.innerHTML = loginTemplate();
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', (event) => {
    console.log('submit');
    event.preventDefault();
    const formData = new FormData(loginForm);
    window.AjaxModule.doPost({
      callback() {
        // ESLint want to kill me for these lines
        // They print FormData body
        // I'll remove them soon
        for (let [key, value] of formData.entries()) {
          console.log(key, value);
        }
      },
      body: formData,
      path: '/login',
    });
  });

  // пока повесил переход в меню
  // потом на проверку пользовательских данных
}
