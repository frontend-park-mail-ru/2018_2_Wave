class GlobalUser {
  setUserToken(userToken) {
    this.userToken = userToken;
  }

  setState(data) {
    this.setUserToken(data);
  }
}

export default new GlobalUser();
