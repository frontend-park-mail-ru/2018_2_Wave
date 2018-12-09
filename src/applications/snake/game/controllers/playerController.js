import busController from '../../modules/busController';

export default class PlayerController {
  constructor(player, view) {
    this.player = player;
    this.view = view;
    this.busController = busController;

    this.events = {
      DEAD: this.setDead.bind(this),
      pickFood: this.addToScore.bind(this),
    };
  }

  init() {
    this.setBusListebers();
  }

  setBusListebers() {
    this.busController.setBusListeners(this.events);
  }

  removeBusListeners() {
    this.busController.removeBusListeners(this.events);
  }

  update() {
  }

  setDead() {
    this.removeBusListeners();
    this.player.setDead();
  }

  addToScore(value = 1) {
    this.player.addToScore(value);
    this.view.setScore(this.player.score);
  }
}
