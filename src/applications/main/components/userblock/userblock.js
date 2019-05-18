import userService from '../../../../modules/userservice';
import bus from '../../../../modules/bus';
import Component from '../../../component';

import './userblock.pcss';

// import '../../../../../static/img/triss.jpg';


const template = require('./userblock.pug');


export default class UserBlock extends Component {
  constructor(parent, markTag = 'userblock') {
    super({ template, parent, markTag });

    bus.listen('userUpdated', super.render.bind(this));
  }

  async getData() {
    const { err, user } = await userService.getUser();
    if (err) return { user: { username: 'not logged in' } };

    return { user };
  }
}
