import Element from '../../element';

import template from '../templates/chat.pug';

export default class ChatView extends Element {
  constructor(parent) {
    super(template, parent);
  }
}
