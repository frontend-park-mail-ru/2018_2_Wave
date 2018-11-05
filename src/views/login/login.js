import ajax from '../../modules/ajax';
import bus from '../../modules/bus';
import BaseView from '../baseview';
import './login.css';

const template = require('./login.pug');


export default class LoginView extends BaseView {
  constructor(parent) {
    super(template, parent);
  }

  show() {
    super.show();
    this.render();
  }

  render() {
    super.render();
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      try {
        await ajax.POST({
          path: '/session',
          body: new FormData(loginForm),
        });
        console.log('logged in');
        bus.emit('link', '/');
        bus.emit('userUpdate');
      } catch (error) {
        console.error(error);
        // ↓ will be redone soon ↓ TODO: FIXME:
        const errorMessage = document.querySelector('#errorMessage');
        errorMessage.classList.add('show');
      }
    });
  }
}
