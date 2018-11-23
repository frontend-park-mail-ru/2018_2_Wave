import AudioModel from '../model/audioModel';
import busController from '../modules/busController';

import gameOfThrones from '../static/audio/game_of_thrones.mp3';
import radioactive from '../static/audio/radioactive.mp3';
import starWars from '../static/audio/star_wars.mp3';
import turnDown from '../static/audio/turn_down_for_what.mp3';

export default class AudioController {
  constructor() {
    this.busController = busController;
    this.root = '../static/audio';
    this.mainAudios = [
      gameOfThrones,
      radioactive,
      starWars,
      turnDown,
    ];

    this.eventsMethods = {
      startGame: this.mainAudioPlay.bind(this),
    };

    this.busController.setBusListeners(this.eventsMethods);
    this.init();
  }

  init() {
    const audios = this.mainAudios.length;
    const randomAudioIndex = Math.floor(Math.random() * (audios - 1));
    const mainAudio = this.mainAudios[randomAudioIndex];
    this.mainAudio = new AudioModel(mainAudio);
    this.mainAudioPlay();
  }

  mainAudioPlay() {
    console.log('main audio play');
    this.mainAudio.play();
  }

  mainAudioPause() {
    this.mainAudio.pause();
  }
}
