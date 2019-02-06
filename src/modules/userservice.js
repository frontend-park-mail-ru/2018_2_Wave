import bus from './bus';
import { logout, getProfile } from './network';


class UserService {
  constructor() {
    this.user = {};
    this.loggedIn = false;
    bus.listen('checkUser', () => {
      this.updatePromise = this.update();
    });
  }


  isLoggedIn() {
    return this.loggedIn;
  }


  async getUser() {
    await this.updatePromise;

    if (!this.loggedIn) {
      bus.emit('link', '/terminal');
      return { err: 'unathorized' };
    }

    return { user: this.user };
  }


  async update(action) {
    if (action === 'logout') {
      this.loggedIn = false;
      this.user = {};

      this.updatePromise = logout();
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

    bus.emit('userUpdated');
  }
}


export default new UserService();
