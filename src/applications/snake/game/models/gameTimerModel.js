export default class gameTimerModel {
  constructor() {
    this.init();
  }

  init() {
    this.begining = Date.now();
  }

  getTime() {
    const currentTime = new Date(Date.now() - this.begining);
    return `${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
  }
}
