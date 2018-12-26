export default class FoodModel {
  constructor() {
    this.foods    = 'abcdefghigklmnopqrstyvwxyz';
    return this;
  }

  init({
    life = 7000,
    birth = Date.now(),
    age = 0,
    type = 3,
    currentLetter = this.foods[Math.floor(Math.random() * this.foods.length)],
  }) {
    if (life < 2000) {
      this.life = 2000;
    } else {
      this.life = life;
    }
    this.birth = birth;
    this.age = age;
    this.type = type;
    this.currentLetter = currentLetter;
  }

  getX() {
    if (this.position) {
      return this.position.x;
    }
    return undefined;
  }

  getLetter() {
    return this.currentLetter;
  }

  getY() {
    if (this.position) {
      return this.position.y;
    }
    return undefined;
  }

  getPosition() {
    return this.position;
  }

  getType() {
    return this.type;
  }

  setPosition(position) {
    const letterIndex = Math.floor(Math.random() * this.foods.length);
    this.currentLetter = this.foods[letterIndex];
    this.position = position;
  }

  resetBirth() {
    this.birth = Date.now();
  }

  getTimeToDeath() {
    return this.life + this.birth - Date.now();
  }
}
