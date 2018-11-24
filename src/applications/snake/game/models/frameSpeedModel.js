export default class FrameSpeedModel {
  constructor(startSpeed = 5) {
    this.framesPerSecond = startSpeed;
  }

  setFramesSpeed(speed) {
    this.framesPerSecond = speed;
  }
}
