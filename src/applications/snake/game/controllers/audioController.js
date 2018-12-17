import AudioModel from '../models/audioModel';
import busController from '../../modules/busController';

import gameOfThrones from '../../static/audio/game_of_thrones.mp3';
import radioactive from '../../static/audio/radioactive.mp3';
import starWars from '../../static/audio/star_wars.mp3';
import turnDown from '../../static/audio/turn_down_for_what.mp3';
import pickFood from '../../static/audio/pickup.mp3';
import deadMain from '../../static/audio/dead_main.wav';
import deadUx from '../../static/audio/dead_ux.wav';

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

    this.deadAudios = [
      deadMain,
      deadUx,
    ];

    this.pickFood = this.pickFood.bind(this);
    this.dead = this.dead.bind(this);
    this.events = {
      pickFood: this.pickFood,
      DEAD: this.dead,
    };

    // const audios = this.mainAudios.length;
    // const randomAudioIndex = Math.floor(Math.random() * (audios - 1));
    // const mainAudio = this.mainAudios[randomAudioIndex];
    const mainAudio = AudioController.getRandom(this.mainAudios);
    const dead = AudioController.getRandom(this.deadAudios);

    this.mainAudio = new AudioModel(mainAudio);
    this.pickFood = new AudioModel(pickFood);
    this.dead = new AudioModel(dead);

    this.busController = busController;
  }

  static getRandom(list) {
    return list[Math.floor(Math.random() * (list.length - 1))];
  }

  start() {
    this.mainAudio.play();
    this.setBusListeners();
  }

  pause() {
    this.mainAudio.pause();
    this.removeBusListeners();
  }

  resume() {
    this.mainAudio.play();
    this.setBusListeners();
  }

  destroy() {
    this.mainAudio.pause();
    this.removeBusListeners();
  }

  pickFood() {
    this.pickFood.play();
  }

  dead() {
    this.mainAudio.stop();
    this.dead.play();
  }

  setBusListeners() {
    this.busController.setBusListeners(this.events);
  }

  removeBusListeners() {
    this.busController.removeBusListeners(this.events);
  }
}
