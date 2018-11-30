export default class WsMessage {
  constructor(webSocket) {
    this.ws = webSocket;
  }

  addToRoom() {
    this.ws.send({
      signal: 'add_to_room',
      payload: {
        room_token: 'snake',
      },
    });
  }

  startGame() {
    this.ws.send({
      room_id: 'snake',
      signal: 'game_play',
    });
  }

  sendAction(direction) {
    this.ws.send({
      room_id: 'snake',
      signal: 'game_action',
      payload: {
        action: direction,
      },
    });
  }

  sendDirection(keyboardDirection) {
    let direction;
    switch(keyboardDirection) {
      case 'ArrowUp':
        direction = 'move_down';
      break;

      case 'ArrowDown':
        direction = 'move_up';
      break;

      case 'ArrowLeft':
        direction = 'move_left';
      break;

      case 'ArrowRight':
        direction = 'move_right';
      break;
    }
    this.sendAction(direction);
  }
}
