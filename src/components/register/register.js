import AjaxModule from '../../modules/ajax';
import './registration.css';
import { validate } from '../validation/validation';

const registerTemplate = require('./register.pug');

const root = document.getElementById('root');

export default function createRegister() {
  root.innerHTML = registerTemplate();
  const registerForm = document.getElementById('registerForm');

  registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(registerForm);

    AjaxModule.Post({
      path: '/user/signup',
      body: formData,
      callback: {
        success: () => {
          const ev = new CustomEvent('link', { detail: 'menu' });
          root.dispatchEvent(ev);
        },
        failure: (error) => {
          console.log(error);
          // TODO: show error
        },
      },
    });
  });
  validate();
}
