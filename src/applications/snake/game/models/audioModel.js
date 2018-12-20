export default class AudioModel {
  constructor({ path, volume = 1, loop = false }) {
    this.path         = path;
    this.audio        = new Audio();
    this.audio.src    = `./${path}`;
    this.audio.loop   = loop;
    this.audio.volume = volume;
    this.riseVolume = this.riseVolume.bind(this);
  }

  pause() {
    this.audio.pause();
  }

  stop() {
    this.audio.currentTime = 0;
    this.pause();
  }

  riseVolume() {
    if (this.audio.volume < 1) {
      this.audio.volume += 0.1;
      console.log(this.volume);
      setTimeout(this.riseVolume, 1500);
    }
  }

  play() {
    if (this.audio.playing) {
      this.stop();
      this.audio.currentTime = 0;
    }
    const playPromise = this.audio.play();

    if (playPromise !== undefined) {
      playPromise.then((_) => {
        // Automatic playback started!
        // Show playing UI.
      })
        .catch((error) => {
          console.log(error);
        // Auto-play was prevented
        // Show paused UI.
        });
    }
  }
}
