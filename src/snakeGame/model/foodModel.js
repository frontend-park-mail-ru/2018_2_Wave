export default class FoodModel {
  constructor() {
    this.life     = 1000;
    this.birth    = Date.now();
    this.age      = 0;
    this.type     = 1;
    this.foods    = 'illeatyouup';
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
    this.position = position;
  }

  resetBirth() {
    this.birth = Date.now();
  }
}
