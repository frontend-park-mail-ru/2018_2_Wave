import Element from '../../element';

const template = require('../templates/menu.pug');

const buttons = {
  '/terminal': 'Terminalium',
  '/snake': 'Anacondium',
  '/chat': 'Chatium',
  '/leaderboard': 'Leaderboardium',
  '/settings': 'Settium',
};


export default class MenuView extends Element {
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
