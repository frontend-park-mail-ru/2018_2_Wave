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


  async update(action) {
    this.updating = true;

    if (action === 'logout') {
      this.loggedIn = false;
      this.user = {};
    } else {
      const { err, profile: user } = await getProfile();
      if (err) {
        if (err.status !== 401) console.error(err);
        this.user = {};
        this.loggedIn = false;
      } else {
        this.user = user;
        this.loggedIn = true;
      }
    }

    this.updating = false;
    bus.emit('userUpdated');
  }
}


export default new UserService();
