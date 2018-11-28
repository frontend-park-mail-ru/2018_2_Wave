import wsRouter from './wsRouter';

class Ws {
  constructor() {
    // this.host = window.location.host;
    this.wsRouter = wsRouter;

    // const address = `${window.location.protocol.replace('http', 'ws')}//${this.host}/ws`;
    const address = 'ws://localhost:9600/conn/ws';
    this.ws = new WebSocket(address);

    this.ws.onopen = (event) => {
      console.log(`WebSocket on address ${address} opened`);
      this.ws.onmessage = this.handleMessage.bind(this);

      this.ws.onclose = () => {
        console.log('WebSocket closed');
      };
/*
      this.send({
        room_id: 'app',
        signal: 'add_to_room',
        payload: {
          room_id: 'snake',
        },
      });

      setTimeout(() => {
        this.send({
          room_id: 'snake',
          signal: 'game_play',
        });
      }, 1000);
*/

    };
  }

  handleMessage(event) {
    try {
      const message = JSON.parse(event.data);
      console.log(message);
      this.wsRouter.sendByRoute(message);
    } catch (err) {
      console.error('smth went wront in handleMessage: ', err);
    }
  }

  send(data) {
    // костыль
    this.waitForConnection(() => { console.log('send', data); this.ws.send(JSON.stringify(data)); }, 5000);
  }

  waitForConnection(callback, interval) {
    if (this.ws.readyState === 1) {
      callback();
    } else {
      const that = this;
      // optional: implement backoff for interval here
      setTimeout(() => {
        that.waitForConnection(callback, interval);
      }, interval);
    }
  }
}

const ws = new Ws();
export default ws;
