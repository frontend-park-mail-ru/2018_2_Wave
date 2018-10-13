import ajax from '../../modules/ajax';
import './registration.css';
import { validate } from '../validation/validation';

const registerTemplate = require('./register.pug');

const root = document.getElementById('root');


export default function createRegister() {
  root.innerHTML = registerTemplate();
  const registerForm = document.getElementById('registerForm');

  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
      await ajax.POST({
        path: '/user/signup',
        body: new FormData(registerForm),
      });
      const ev = new CustomEvent('link', { detail: 'menu' });
      root.dispatchEvent(ev);
    } catch (error) {
      // TODO: show error
      console.log(error);
    }
  });
  validate();
}
