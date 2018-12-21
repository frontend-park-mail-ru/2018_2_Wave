import userService from '../../modules/userservice';

class GlobalUser {
  setUserToken(userToken) {
    this.userToken = userToken;
  }

  setState(data) {
    this.setUserToken(data);
  }

  isLoginUser() {
    const { err, loggedIn } = userService.isLoggedIn();
    console.log(err, loggedIn, this.userToken);
    if (err || !loggedIn) {
      return false;
    }
    return true;
  }
}

export default new GlobalUser();
