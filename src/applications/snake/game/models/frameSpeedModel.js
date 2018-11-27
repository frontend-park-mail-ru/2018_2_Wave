export default class FrameSpeedModel {
  constructor(startSpeed = 5) {
    this.framesPerSecond = startSpeed;
  }

  setFrameSpeed(speed) {
    this.framesPerSecond = speed;
  }

  getSpeed() {
    return this.framesPerSecond;
  }

  init() {
  }
}
