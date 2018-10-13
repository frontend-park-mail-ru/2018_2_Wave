import ajax from '../../modules/ajax';
import './login.css';

const loginTemplate = require('./login.pug');

const root = document.getElementById('root');


export default function createLogin() {
  root.innerHTML = loginTemplate();
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
      await ajax.POST({
        path: '/user/login',
        body: new FormData(loginForm),
      });
      const ev = new CustomEvent('link', { detail: 'menu' });
      root.dispatchEvent(ev);
    } catch (error) {
      const errorMessage = root.querySelector('#errorMessage');
      errorMessage.classList.add('show');
    }
  });
}
