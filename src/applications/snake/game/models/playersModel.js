let instance;
export default class PlayersModel {
  constructor() {
    if (!instance) {
      this.players = document.getElementsByClassName('players');
      instance = this;
    }
    return instance;
  }

  setState(userSerial, score) {
    const player = this.players.item(userSerial);
    const [scoreElement] = player.getElementsByClassName('score');
    scoreElement.innerHTML = score;
  }

  setDead(userSerial) {
    const player = this.players.item(userSerial);
    player.classList.add('player_dead');
  }
}
