import busController from '../../modules/busController';

export default class FoodController {
  constructor(player, level) {
    this.player = player;
    this.level = level;
    this.busController = busController;

    this.events = {
      DEAD: this.setDead.bind(this),
      pickFood: this.addToScore.bind(this),
    };

    this.busController.setBusListeners(this.events);
  }

  init() {
  }

  update() {
  }

  setDead() {
    busController.removeBusListeners(this.events);
    this.player.setDead();
  }

  addToScore(value = 1) {
    this.player.addToScore(value);
  }
}
