import globalUser from '../../globalUser';

export default class Player {
  constructor() {
    this.score = 0;
    this.isDead = false;
    this.userToken = globalUser.userToken;
  }

  setDead() {
    this.isDead = true;
  }

  addToScore() {
    this.score += 1;
  }
}
