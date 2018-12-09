class Config {
  constructor() {
    this.enemyCollors = [];
    this.setGreenCollors();
  }

  setDefaultCollors() {
    // розовые стены голубая змея зеленая еда
    this.wallColor = '#FF40FF';
    this.snakeCollor = '#00FFFF';
    this.foodCollor = '#40FF00';
  }

  setGreenCollors() {
    this.wallColor = '#FF0000';
    this.snakeCollor = '#00FF00';
    this.foodCollor = '#C0FF00';
  }

  setPurpleCollors() {
    // фиолетовые стены розовая еда
    this.wallColor = '#000761';
    this.snakeCollor = '#00FFFF';
    this.foodCollor = '#FE00DD';
  }
}

export default new Config();
