export default class FoodModel {
  constructor() {
    this.foods    = 'abcdefghigklmnopqrstyvwxyz';
    return this;
  }

  init({
    life = 30000,
    birth = Date.now(),
    age = 0,
    type = 1,
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

  getY() {
    return this.position.y;
  }

  getType() {
    return this.type;
  }

  setFoodPosition(position) {
    const letterIndex = Math.floor(Math.random() * this.foods.length);
    this.currentLetter = this.foods[letterIndex];
    this.position = position;
  }

  resetBirth() {
    this.birth = Date.now();
  }
}
