import globalWs from '../../../modules/webSocket';

class WebSocket {
  constructor() {
    this.ws = globalWs;
  }

  async addToRoom() {
    await this.ws.send({
      room_id: 'app',
      signal: 'add_to_room',
      payload: {
        room_id: 'snake',
      },
    });
  }

  async startGame() {
    await this.ws.send({
      room_id: 'snake',
      signal: 'game_play',
    });
  }
}

export default new WebSocket();
