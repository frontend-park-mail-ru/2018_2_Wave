import bus from './bus';
import { getProfile } from './network';


class UserService {
  constructor() {
    console.log('userService constructs...');
    this.user = {};
    this.loggedIn = false;
    bus.listen('checkUser', this.update.bind(this));
    this.update();
  }


  isLoggedIn() {
    if (this.updating === true) {
      return { err: 'updating' };
    }

    return { loggedIn: this.loggedIn };
  }


  getUser() {
    const { err, loggedIn } = this.isLoggedIn();

    if (err) {
      if (err === 'updating') return { err };
      throw new Error();
    } else if (!loggedIn) {
      bus.emit('link', '/login');
      return { err: 'unathorized' };
    }

    return { user: this.user };
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

    this.user = user;
    this.loggedIn = true;
    this.updating = false;
    bus.emit('userUpdated');
  }
}


const userService = new UserService();

export default userService;
