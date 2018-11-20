import bus from '../../../modules/bus';
import BaseView from '../../base_view';
import { login } from '../../../modules/network';

import '../styles/login.css';

const template = require('../templates/login.pug');


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
    // ↓ will be redone soon ↓ TODO: FIXME:
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const loginData = new FormData(loginForm);
      const { err } = await login(loginData);

      if (!err) {
        bus.emit('link', '/');
        bus.emit('checkUser');
      } else {
        console.error(err);
        // ↓ will be redone soon ↓ TODO: FIXME:
        const errorMessage = document.querySelector('#errorMessage');
        errorMessage.classList.add('show');
      }
    });
  }
}
