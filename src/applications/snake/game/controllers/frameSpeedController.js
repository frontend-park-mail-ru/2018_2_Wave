export default class FrameSpeedController {
  constructor(frameSpeed) {
    this.frameSpeed = frameSpeed;
    this.delta = 0.5;
  }

  init() {
    this.frameSpeed.init();
  }

  update() {
    const currentFrameSpeed = this.frameSpeed.getSpeed();
    if (currentFrameSpeed > 60) {
      this.delta = -0.5;
    }

    if (currentFrameSpeed < 5) {
      this.delta = 0.5;
    }
    this.frameSpeed.setFrameSpeed(currentFrameSpeed + this.delta);
  }
}
