import bus from './bus';
import { getProfile } from './network';


class UserService {
  constructor() {
    this.user = {};
    this.loggedIn = false;
    bus.listen('checkUser', this.update.bind(this));
    this.update();
  }


  isLoggedIn() {
    return (this.updating === false)
      ? { loggedIn: this.loggedIn }
      : { err: 'updating' };
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
    const { err, profile: user } = await getProfile();

    if (err) return;

    this.user = user;
    this.loggedIn = true;
    this.updating = false;
    bus.emit('userUpdated');
  }
}


const userService = new UserService();

export default userService;
