import Element from '../../element';

import chatTemplate from '../templates/chat.pug';
import roomTemplate from '../templates/room.pug';

import '../styles/chat.css';
import '../styles/room.css';

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
    bus.listen('new_chat', this.updateChats);
    ws.send('manager', 'lobby_list');
  }

  updateChats(payload) {
    console.log({ payload });
    // get chat list
    bus.ignore('new_chat', this.updateChats);

    const rooms = [
      ...payload,
    ];

    // this.roomList.innerHTML = '';

    rooms.forEach((room) => {
      this.roomList.innerHTML += roomTemplate({ room });
    });

    
    // this.roomList.addEventListener('click', (event) => {
    //   console.log(event.target);
    // });
  }
}
