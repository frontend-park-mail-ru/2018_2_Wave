class Config {
  constructor() {
    this.setDefaultColors();
  }

  setColors(colorsConfig) {
    const {
      wallColor,
      snakeColor,
      foodColor,
      snakemenuButtonFocus,
      enemiesColors,
    } = colorsConfig;

    this.wallColor = wallColor;
    this.snakeColor = snakeColor;
    this.foodColor = foodColor;
    this.snakemenuButtonFocus = snakemenuButtonFocus;
    this.enemiesColors = enemiesColors;
  }

  setDefaultColors() {
    // розовые стены голубая змея зеленая еда
    this.wallColor = '#FF40FF';
    this.snakeColor = '#00FFFF';
    this.foodColor = '#40FF00';
    this.snakemenuButtonFocus = 'snakemenu-button__focus-purple';
    this.enemiesColors = ['greenyellow', 'yellow', 'red', 'blue'];
  }
}

export default new Config();
