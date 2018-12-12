import busController from './busController';
import viewConfig from './view_config';

const defaultStyle = {
  snakemenu_main_border: 'snakemenu__purple-border',
  config_colors: {
    wallColor: '#FF40FF',
    snakeCollor: '#00FFFF',
    foodCollor: '#40FF00',
  },
};

const yellowgreenStyle = {
  snakemenu_main_border: 'snakemenu__yellowgreen-border',
  config_colors: {
    wallColor: '#FF0000',
    snakeCollor: '#00FF00',
    foodCollor: '#C0FF00',
  },
};

const pinkStyle = {
  snakemenu_main_border: 'snakemenu__pink-border',
  config_colors: {
    wallColor: '#000761',
    snakeCollor: '#00FFFF',
    foodCollor: '#FE00DD',
  },
};

export default class StyleChanger {
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
    Object.keys(this.currentStyle).forEach((styleKey) => {
      const styledElements = document.getElementsByClassName(this.currentStyle[styleKey]);
      for (let i = styledElements.length - 1; i >= 0; i -= 1) {
        styledElements[i].classList.add(nextStyle[styleKey]);
        styledElements[i].classList.remove(this.currentStyle[styleKey]);
      }
    });
    viewConfig.setColors(nextStyle.config_colors);
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
