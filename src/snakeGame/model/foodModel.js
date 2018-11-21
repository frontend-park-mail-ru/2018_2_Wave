export default class FoodModel {
  constructor() {
    this.foods    = 'abcdefghigklmnopqrstyvwxyz';
    return this;
  }

  init({
    life = 3000,
    birth = Date.now(),
    age = 0,
    type = 3,
    currentLetter = this.foods[Math.floor(Math.random() * this.foods.length)],
  }) {
    this.life = life;
    this.birth = birth;
    this.age = age;
    this.type = type;
    this.currentLetter = currentLetter;
  }

  getX() {
    return this.position.x;
  }

  getLetter() {
    return this.currentLetter;
  }

  getY() {
    return this.position.y;
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
}
