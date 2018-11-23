import Element from '../../element';

const template = require('../templates/menu.pug');

const buttons = {
  '/terminal': 'Terminal',
  '/leaderboard': 'Leaderboard',
  '/settings': 'Settings',
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
