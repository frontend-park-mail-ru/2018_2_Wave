import config from './wsConfig';

export default class WsMessage {
  constructor(webSocket) {
    this.ws = webSocket;
  }

  addToRoom(room_token = config.DEFAULT_ROOM_TOKEN) {
    this.ws.send({
      signal: 'add_to_room',
      payload: {
        room_token,
      },
    });
  }

  startGame(room_token = config.DEFAULT_ROOM_TOKEN) {
    this.ws.send({
      room_token,
      signal: 'game_play',
    });
  }

  sendAction(direction, room_token = config.DEFAULT_ROOM_TOKEN) {
    this.ws.send({
      room_token,
      signal: 'game_action',
      payload: {
        action: direction,
      },
    });
  }

  sendGameExit(room_token = config.DEFAULT_ROOM_TOKEN) {
    this.ws.send({
      room_token,
      signal: 'game_exit',
    });
  }

  sendDirection(keyboardDirection) {
    let direction;
    switch (keyboardDirection) {
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
