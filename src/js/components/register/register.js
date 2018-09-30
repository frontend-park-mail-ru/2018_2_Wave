import AjaxModule from '../../modules/ajax';
import './registration.css';

const registerTemplate = require('./register.pug');

const root = document.getElementById('root');


export default function createRegister() {
  root.innerHTML = registerTemplate();
  const registerForm = document.getElementById('registerForm');

  registerForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(registerForm);

    AjaxModule.doPost({
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
}
