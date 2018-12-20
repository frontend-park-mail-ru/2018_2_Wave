import busController from './busController';
import viewConfig from './view_config';

const defaultStyle = {
  classes: {
    snakemenu_main_border: 'snakemenu__purple-border',
    mainScoreColor: 'main-score__purple',
    snakemenuButtonFocus: 'snakemenu-button__focus-purple',
    gameBoardBorder: 'game-board__purple',
    gameCanvasBorder: 'game-canvas__purple',
    gameName: 'gamename_purple',
  },
  config_colors: {
    wallColor: '#FF40FF',
    snakeColor: '#00FFFF',
    foodColor: '#40FF00',
  },
};

const yellowgreenStyle = {
  classes: {
    snakemenu_main_border: 'snakemenu__yellowgreen-border',
    mainScoreColor: 'main-score__greenyellow',
    snakemenuButtonFocus: 'snakemenu-button__focus-greenyellow',
    gameBoardBorder: 'game-board__greenyellow',
    gameCanvasBorder: 'game-canvas__greenyellow',
    gameName: 'gamename_greenyellow',
  },
  config_colors: {
    wallColor: '#FF0000',
    snakeColor: '#00FF00',
    foodColor: '#C0FF00',
  },
};

const pinkStyle = {
  classes: {
    snakemenu_main_border: 'snakemenu__pink-border',
    mainScoreColor: 'main-score__pink',
    snakemenuButtonFocus: 'snakemenu-button__focus-pink',
    gameBoardBorder: 'game-board__pink',
    gameCanvasBorder: 'game-canvas__pink',
    gameName: 'gamename_pink',
  },
  config_colors: {
    wallColor: '#000761',
    snakeColor: '#00FFFF',
    foodColor: '#FE00DD',
  },
};

class StyleChanger {
  constructor() {
    this.styles = [defaultStyle, yellowgreenStyle, pinkStyle];
    this.currentStyle = defaultStyle;
    this.currentStyleIndex = 0;
    this.changeStyle = this.changeStyle.bind(this);
  }

  start() {
    this.setBusListeners();
  }

  stop() {
    this.removeBusListener();
  }

  changeStyle() {
    const [nextStyle, nextStyleIndex] = this.nextStyle();
    Object.keys(this.currentStyle.classes).forEach((styleKey) => {
      const styledElements = document.getElementsByClassName(this.currentStyle.classes[styleKey]);
      for (let i = styledElements.length - 1; i >= 0; i -= 1) {
        styledElements[i].classList.add(nextStyle.classes[styleKey]);
        styledElements[i].classList.remove(this.currentStyle.classes[styleKey]);
      }
    });
    viewConfig.setColors(nextStyle.config_colors, nextStyle.classes);
    this.currentStyle = nextStyle;
    this.currentStyleIndex = nextStyleIndex;
  }

  nextStyle() {
    if (this.currentStyleIndex < this.styles.length - 1) {
      return [this.styles[this.currentStyleIndex + 1], this.currentStyleIndex + 1];
    }
    return [this.styles[0], 0];
  }

  setBusListeners() {
    busController.setBusListeners({ KeyT: this.changeStyle });
  }

  removeBusListener() {
    busController.removeBusListeners({ KeyT: this.changeStyle });
  }
}

export default new StyleChanger();
