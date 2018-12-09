export default class PlayerView {
  constructor() {
    [this.scoreWrapper] = document.getElementsByClassName('score__value');
  }

  setScore(value) {
    this.scoreWrapper.innerHTML = value;
  }
}
