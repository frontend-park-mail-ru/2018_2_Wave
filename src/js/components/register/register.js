import AjaxModule from '../../modules/ajax';
import './registration.css';
import { validate /* , isValid */} from '../validation/validation';
// Дима Л.: рабочая функция isValid
// Дима П.: она клёвая, но не используется, ESLint матерится :(

const registerTemplate = require('./register.pug');

const root = document.getElementById('root');


export default function createRegister() {
  root.innerHTML = registerTemplate();
  const registerForm = document.getElementById('registerForm');

  registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(registerForm);

    AjaxModule.Post({
      callback(xhr) {
        if (xhr.status === 201) {
          const ev = new CustomEvent('link', { detail: 'menu' });
          root.dispatchEvent(ev);
        } else {
          // TODO: show error
        }
      },
      path: '/register',
      body: formData,
    });
  });

  // запускать в конце, после неё код не выполняется
  validate();
}
