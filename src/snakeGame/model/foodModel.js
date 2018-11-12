export default class FoodModel {
  constructor() {
    this.life     = 1000;
    this.birth    = Date.now();
    this.age      = 0;
    this.type     = 1;
    this.foods    = 'illeatyouupqwertyuiopdfghjklsdfghjkldfghjkldfghjkdfghjkdfghjkfgh';
    const letterIndex = Math.floor(Math.random() * this.foods.length);
    this.currenLetter = this.foods[letterIndex];
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
    this.currenLetter = this.foods[letterIndex];
    console.log(this.currenLetter);
    this.position = position;
  }

  resetBirth() {
    this.birth = Date.now();
  }
}
