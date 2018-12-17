import AudioModel from '../models/audioModel';
import busController from '../../modules/busController';

// import gameOfThrones from '../../static/audio/game_of_thrones.mp3';
// import radioactive from '../../static/audio/radioactive.mp3';
// import starWars from '../../static/audio/star_wars.mp3';
// import turnDown from '../../static/audio/turn_down_for_what.mp3';

export default class AudioController {
  constructor() {
    this.busController = busController;
    this.root = '../static/audio';
    this.mainAudios = [
      // gameOfThrones,
      // radioactive,
      // starWars,
      // turnDown,
    ];

    this.init();
  }

  init() {
    const audios = this.mainAudios.length;
    const randomAudioIndex = Math.floor(Math.random() * (audios - 1));
    const mainAudio = this.mainAudios[randomAudioIndex];
    this.mainAudio = new AudioModel(mainAudio);
  }

  start() {
    this.mainAudio.play();
  }

  pause() {
    this.mainAudio.pause();
  }

  resume() {
    this.mainAudio.play();
  }

  destroy() {
    this.mainAudio.pause();
  }
}
