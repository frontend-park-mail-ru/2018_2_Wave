import BaseView from '../baseview';

const template = require('./menu.pug');

const buttons = {
  '/play': 'Play',
  '/leaderboard': 'Leaderboard',
  '/settings': 'Settings',
};


export default class MenuView extends BaseView {
  constructor(parent) {
    super(template, parent);
  }

  show() {
    super.show();
    if (!this.rendered) {
      // render only one time, because menu is unchangeable
      this.render();
    }
  }

  render() {
    super.render({ buttons });
  }
}
