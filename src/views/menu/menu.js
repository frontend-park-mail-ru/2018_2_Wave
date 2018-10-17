import BaseView from '../baseview';

const template = require('./menu.pug');

const buttons = {
  play: 'Play',
  leaderboard: 'Leaderboard',
  settings: 'Settings',
};

export default class MenuView extends BaseView {
  constructor(parent) {
    super(template, parent);
  }

  render() {
    super.render({ buttons });
  }
}
