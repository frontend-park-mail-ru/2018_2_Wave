import Element from '../../element';

import chatTemplate from '../templates/chat.pug';
import roomTemplate from '../templates/room.pug';

import '../styles/chat.pcss';
import '../styles/room.pcss';

import ws from '../../../modules/webSocket';
import bus from '../../../modules/bus';


export default class ChatView extends Element {
  constructor(parent) {
    super(chatTemplate, parent);
    super.render();
    [this.roomList] = this.wrapper.getElementsByClassName('rooms');

    this.updateChats = this.updateChats.bind(this);
  }

  askForChats() {
    bus.listen('manager', this.updateChats);
    ws.send('lobby_list');
  }

  updateChats(payload) {
    console.log({ payload });
    // get chat list
    bus.ignore('manager', this.updateChats);

    const rooms = [
      {
        avatar: '/img/avatars/default',
        room_id: '1',
        name: 'vasya',
        last: 'hello',
      },
      {
        avatar: '/img/avatars/default',
        room_id: '2',
        name: 'petya',
        last: 'hello',
      },
      ...payload,
    ];

    console.log('here');

    this.roomList.innerHTML = '';

    rooms.forEach((room) => {
      this.roomList.innerHTML += roomTemplate({ room });
    });

    // this.roomList.addEventListener('click', (event) => {
    //   console.log(event.target);
    // });
  }
}
