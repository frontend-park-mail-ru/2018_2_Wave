import AjaxModule from '../../modules/ajax';

const loginTemplate = require('./login.pug');

const root = document.getElementById('root');


export default function createLogin() {
  root.innerHTML = loginTemplate();
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);

    AjaxModule.Post({
      callback(xhr) {
        if (xhr.status === 202) {
          const ev = new CustomEvent('link', { detail: 'menu' });
          root.dispatchEvent(ev);
        } else {
          // TODO: show error
        }
      },
      path: '/login',
      body: formData,
    });
  });
}
