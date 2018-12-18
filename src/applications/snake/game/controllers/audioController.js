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
    this.pauseMusic = this.pauseMusic.bind(this);
    this.events = {
      pickFood: this.pickFood,
      DEAD: this.dead,
      KeyS: this.pauseMusic,
    };

    this.setNewMainAudio();
    this.setNewDead();

    this.pause = false;
    this.pickFood = new AudioModel({ path: pickFood });
    this.busController = busController;
  }

  static getRandom(list) {
    return list[Math.floor(Math.random() * (list.length - 0.1))];
  }

  start() {
    this.mainAudio.play();
    this.setBusListeners();
  }

  setNewMainAudio() {
    const mainAudio = AudioController.getRandom(this.mainAudios);
    this.mainAudio = new AudioModel({ path: mainAudio, loop: true });
  }

  pauseMusic() {
    if (this.pause) {
      this.mainAudio.play();
    } else {
      this.mainAudio.pause();
    }
    this.pause = !this.pause;
  }

  setNewDead() {
    const dead = AudioController.getRandom(this.deadAudios);
    this.dead = new AudioModel({ path: dead });
  }

  pause() {
    this.mainAudio.pause();
    this.setNewMainAudio();
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
    if (!this.pause) {
      this.pickFood.play();
    }
  }

  dead() {
    if (!this.pause) {
      this.mainAudio.stop();
      this.dead.play();
      this.setNewDead();
    }
  }

  setBusListeners() {
    this.busController.setBusListeners(this.events);
  }

  removeBusListeners() {
    this.busController.removeBusListeners(this.events);
  }
}
