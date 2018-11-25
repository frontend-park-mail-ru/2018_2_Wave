import Element from '../../element';

import chatTemplate from '../templates/chat.pug';
import roomTemplate from '../templates/room.pug';

import '../styles/chat.css';
import '../styles/room.css';

export default class ChatView extends Element {
  constructor(parent) {
    super(chatTemplate, parent);
    super.render();
    [this.roomList] = this.wrapper.getElementsByClassName('rooms');
  }


  updateChats() {
    // get chat list
    const rooms = [
      {
        avatar: '/img/avatars/default',
        id: 'vasya',
        message: 'hello',
      },
      {
        avatar: '/img/avatars/default',
        id: 'vasya',
        message: 'hello',
      },
    ];

    this.roomList.innerHTML = '';

    rooms.forEach((room) => {
      this.roomList.innerHTML += roomTemplate({ room });
    });
  }
}
