import userService from '../../../../modules/userservice';
import bus from '../../../../modules/bus';
import Component from '../../../component';

import './userblock.pcss';

// import '../../../../../static/img/triss.jpg';


const template = require('./userblock.pug');


export default class UserBlock extends Component {
  constructor({ name = 'userblock', parent, markTag = 'userblock' }) {
    super({
      name,
      template,
      parent,
      markTag,
    });

    bus.listen('userUpdated', this.update.bind(this));
  }


  // TODO: what is this?
  update() {
    this.render();
  }

  async render() {
    // TODO: why not await?
    const { user } = userService.getUser();
    console.log(user);
    super.render({ user });
  }
}
