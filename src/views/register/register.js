import ajax from '../../modules/ajax';
import bus from '../../modules/bus';
import BaseView from '../baseview';
import { validate } from '../validation/validation';
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
      try {
        await ajax.POST({
          path: '/users',
          body: new FormData(registerForm),
        });
        bus.emit('link', '/');
        bus.emit('userUpdate');
      } catch (error) {
        // TODO: show error
        console.error(error);
      }
    });
    // validate();
  }
}
