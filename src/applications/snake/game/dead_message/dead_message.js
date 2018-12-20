import BaseMenu from '../../game_menu/base_menu/base_menu';
import DeadMessageTemplate from './dead_message.pug';
import './dead_message.pcss';

export default class DeadMessage extends BaseMenu {
  constructor() {
    // const [parent] = document.getElementsByClassName('snakegame-container');
    const [parent] = document.getElementsByClassName('canvas-wrapper');
    super(DeadMessageTemplate, parent, ['dead-message-wrapper'], true, 'dead-menu');
    super.render();
    [this.message] = parent.getElementsByClassName('error-message-text');
    super.hide();
  }

  show(deadMenuContent, score, preText) {
    const [deadScore] = this.parent.getElementsByClassName('dead-message__score');
    deadScore.innerHTML = score;
    const [deadMenu] = this.parent.getElementsByClassName('dead-menu');
    deadMenu.innerHTML = deadMenuContent;
    if (preText) {
      const [deadText] = this.parent.getElementsByClassName('dead-message__text');
      deadText.innerHTML = preText;
    }
    super.show();
  }

  hide() {
    super.hide();
  }
}
