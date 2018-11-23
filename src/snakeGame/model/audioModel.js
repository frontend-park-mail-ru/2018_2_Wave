export default class AudioModel {
  constructor(path, volume = 1, loop = false) {
    this.path         = path;
    this.audio        = new Audio();
    this.audio.src    = `./${path}`;
    this.audio.loop   = loop;
    this.audio.volume = volume;
  }

  pause() {
    this.audio.pause();
  }

  stop() {
    this.audio.currentTime = 0;
    this.pause();
  }

  play() {
    if (this.audio.playing) {
      this.stop();
      this.audio.currentTime = 0;
    }
    this.audio.play();
  }
}
