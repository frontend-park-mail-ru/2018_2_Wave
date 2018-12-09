import BaseMenu from '../../game_menu/utils/base_menu';
import DeadMessageTemplate from './dead_message.pug';

export default class DeadMessage extends  BaseMenu {
  constructor() {
    const [parent] = document.getElementsByClassName('snakegame-container');
    super(DeadMessageTemplate, parent, 'dead-message-wrapper');
    super.render();
    [this.message] = parent.getElementsByClassName('error-message-text');
    super.hide();
  }

  show(deadMenuContent, score) {
    super.show();
    const [deadScore] = this.parent.getElementsByClassName('dead-message__score');
    deadScore.innerHTML = score;
    const [deadMenu] = this.parent.getElementsByClassName('dead-menu');
    deadMenu.innerHTML = deadMenuContent;
  }

  hide() {
    super.hide();
  }
}
