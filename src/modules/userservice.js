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


  async isLoggedIn() {
    // TODO: get usre data from backend on login
    await this.updatePromise;

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
    this.updatePromise = this._update_(action);
    await this.updatePromise;
    bus.emit('userUpdated');
  }


  async _update_(action) {
    if (action === 'logout') {
      this.loggedIn = false;
      this.user = {};

      logout();
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
  }
}


export default new UserService();
