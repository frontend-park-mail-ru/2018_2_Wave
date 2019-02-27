import userService from '../../../../modules/userservice';
import bus from '../../../../modules/bus';
import Element from '../../../element';

import './userblock.pcss';

import '../../../../../static/img/triss.jpg';


const template = require('./userblock.pug');


export default class UserBlock extends Element {
  constructor(parent, wrapper) {
    super(template, parent, wrapper || parent);

    bus.listen('userUpdated', this.update.bind(this));
  }

  update() {
    this.render();
  }

  async render() {
    const { user } = userService.getUser();
    if (!user) return;
    super.render({ user });
  }
}
