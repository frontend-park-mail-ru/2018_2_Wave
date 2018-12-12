import config from './wsConfig';

let instance;

export default class WsPostman {
  constructor(webSocket) {
    if (!instance) {
      this.ws = webSocket;
      instance = this;
    }
    return instance;
  }

  addToQuickSearchRoom(playerCount) {
    this.ws.send({
      signal: 'quick_search',
      payload: {
        player_count: playerCount,
        room_type: '',
      },
    });
  }

  quickSearchAbort() {
    this.ws.send({
      signal: 'quick_search_abort',
    });
  }

  quickSearchAccept() {
    this.ws.send({
      signal: 'quick_search_accept',
      payload: {
        status: true,
      },
    });
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
      default:
        direction = 'move_right';
        break;
    }
    this.sendAction(direction);
  }
}
