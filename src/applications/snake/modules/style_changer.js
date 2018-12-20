import busController from './busController';
import viewConfig from './view_config';

const greenredStyle = {
  classes: {
    snakemenu_main_border: 'snakemenu__greenred-border',
    mainScoreCollor: 'main-score__greenred',
    snakemenuButtonFocus: 'snakemenu-button__focus-greenred',
    gameBoardBorder: 'game-board__greenred',
    gameCanvasBorder: 'game-board__greenred',
    gameName: 'gamename_greenred',
  },
  config_colors: {
    wallColor: '#ff0a27',
    snakeColor: '#0a27ff',
    foodColor: '#a1ff0a',
  },
};


const yellowgreenStyle = {
  classes: {
    snakemenu_main_border: 'snakemenu__yellowgreen-border',
    mainScoreCollor: 'main-score__greenyellow',
    snakemenuButtonFocus: 'snakemenu-button__focus-greenyellow',
    gameBoardBorder: 'game-board__greenyellow',
    gameCanvasBorder: 'game-board__greenyellow',
    gameName: 'gamename_greenyellow',
  },

  config_colors: {
    wallColor: '#ff00b3',
    snakeColor: '#00FF00',
    foodColor: '#4d00ff',
  },
};

const pinkStyle = {
  classes: {
    snakemenu_main_border: 'snakemenu__pink-border',
    mainScoreCollor: 'main-score__pink',
    snakemenuButtonFocus: 'snakemenu-button__focus-pink',
    gameBoardBorder: 'game-board__pink',
    gameCanvasBorder: 'game-board__pink',
    gameName: 'gamename_pink',
  },
  config_colors: {
    wallColor: '#7fffbf',
    snakeColor: '#7fbfff',
    foodColor: '#ffff7f',
  },
};

const cyanStyle = {
  classes: {
    snakemenu_main_border: 'snakemenu__cyan-border',
    mainScoreCollor: 'main-score__cyan',
    snakemenuButtonFocus: 'snakemenu-button__focus-cyan',
    gameBoardBorder: 'game-board__cyan',
    gameCanvasBorder: 'game-board__cyan',
    gameName: 'gamename_cyan',
  },
  config_colors: {
    wallColor: '#ff0080',
    snakeColor: '#80ff00',
    foodColor: '#ff8000',
  },
};

class StyleChanger {
  constructor() {
    this.styles = [greenredStyle, yellowgreenStyle, pinkStyle, cyanStyle];
    this.currentStyle = greenredStyle;
    this.currentStyleIndex = 0;
    this.changeStyle = this.changeStyle.bind(this);
    viewConfig.setColors(this.styles[0].config_colors, this.styles[0].classes);
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
