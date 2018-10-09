import AjaxModule from '../../modules/ajax';
import './login.css';

const loginTemplate = require('./login.pug');

const root = document.getElementById('root');


export default function createLogin() {
  root.innerHTML = loginTemplate();
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);

    AjaxModule.Post({
      callback(response) {
        if (response.status === 202) {
          const ev = new CustomEvent('link', { detail: 'menu' });
          root.dispatchEvent(ev);
        } else {
          const errorMessage = root.querySelector('#errorMessage');
          errorMessage.classList.add('show');
        }
      },
      path: '/user/login',
      body: formData,
    });
  });
}
