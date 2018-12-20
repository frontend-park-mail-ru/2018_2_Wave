class Config {
  constructor() {
    this.setDefaultColors();
  }

  setColors(colorsConfig, classConfig) {
    const {
      wallColor,
      snakeColor,
      foodColor,
    } = colorsConfig;

    const {
      gameCanvasBorder,
      snakemenuButtonFocus,
    } = classConfig;

    this.wallColor = wallColor;
    this.snakeColor = snakeColor;
    this.foodColor = foodColor;
    this.enemiesColors = ['greenyellow', 'yellow', 'red', 'blue'];

    this.gameCanvasBorder = gameCanvasBorder;
    this.snakemenuButtonFocus = snakemenuButtonFocus;
  }

  setDefaultColors() {
    // розовые стены голубая змея зеленая еда
    this.wallColor = 'blue';
    this.snakeColor = '#00FFFF';
    this.foodColor = 'white';
    this.snakemenuButtonFocus = 'snakemenu-button__focus-purple';
    this.enemiesColors = ['greenyellow', 'yellow', 'red', 'blue'];
    this.gameCanvasBorder = 'game-board__purple';
    this.snakemenuButtonFocus = 'snakemenu-button__focus-purple';
  }
}

export default new Config();
