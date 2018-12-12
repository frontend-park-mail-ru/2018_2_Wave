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
    } = colorsConfig;

    this.wallColor = wallColor;
    this.snakeColor = snakeColor;
    this.foodColor = foodColor;
    this.snakemenuButtonFocus = snakemenuButtonFocus;
  }

  setDefaultColors() {
    // розовые стены голубая змея зеленая еда
    this.wallColor = '#FF40FF';
    this.snakeColor = '#00FFFF';
    this.foodColor = '#40FF00';
    this.snakemenuButtonFocus = 'snakemenu-button__focus-purple';
  }

  setGreenColors() {
    this.wallColor = '#FF0000';
    this.snakeColor = '#00FF00';
    this.foodColor = '#C0FF00';
  }

  setPurpleColors() {
    // фиолетовые стены розовая еда
    this.wallColor = '#000761';
    this.snakeColor = '#00FFFF';
    this.foodColor = '#FE00DD';
  }
}

export default new Config();
