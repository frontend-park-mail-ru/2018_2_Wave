import bus from './bus';
import { getProfile } from './network';


class UserService {
  constructor() {
    console.log('userService constructs...');
    this.user = {};
    this.loggedIn = false;
    bus.listen('checkUser', this.update.bind(this));
  }


  isLoggedIn() {
    if (this.updated === false) {
      console.error('User updates now...');
    }

    return this.loggedIn;
  }


  getUser() {
    if (!this.isLoggedIn()) {
      // TODO: return to login page!
      console.error('not logged in!');
    }

    return this.user;
  }


  async update() {
    this.updating = true;
    console.log('updating user...');
    const { err, profile: user } = await getProfile();
    console.log(user);

    if (err) {
      // what is here?
      console.error('user updating failed!');
      console.error(err);
      return;
    }

    if (this.user !== user) {
      this.user = user;
      console.log('user changed');
      bus.emit('userUpdated');
    } else {
      console.log('user not changed');
    }

    this.loggedIn = true;
    this.updating = false;
  }
}


const userService = new UserService();

export default userService;
