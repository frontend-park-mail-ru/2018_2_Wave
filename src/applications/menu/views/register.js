import { register } from '../../modules/network';
import bus from '../../modules/bus';
import BaseView from '../baseview';
import './registration.css';

const template = require('./register.pug');


export default class RegisterView extends BaseView {
  constructor(parent) {
    super(template, parent);
  }

  show() {
    super.show();
    this.render();
  }

  render() {
    super.render();
    // TODO: FIXME: remove id
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const registerData = new FormData(registerForm);
      const { err } = await register(registerData);
      if (err) {
        // TODO: show error
        console.error(err);
        return;
      }

      bus.emit('link', '/');
      bus.emit('checkUser');
    });
  }
}