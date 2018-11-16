import bus from './bus';

class Ws {
  constructor() {
    this.host = window.location.host;
    this.bus = bus;

    const address = `${window.location.protocol.replace('http', 'ws')}//${this.host}/ws`;
    this.ws = new WebSocket(address);

    this.ws.onopen = (event) => {
      console.log(`WebSocket on address ${address} opened`);
      console.dir(this.ws);

      this.ws.onmessage = this.handleMessage.bind(this);

      this.ws.onclose = () => {
        console.log('WebSocket closed');
      };
    };
  }

  handleMessage(event) {
    const messageText = event.data;

    try {
      const message = JSON.parse(messageText);
      this.bus.emit(message.type, message.payload);
    } catch (err) {
      console.error('smth went wront in handleMessage: ', err);
    }
  }

  send(type, payload) {
    this.ws.send(JSON.stringify({ type, payload }));
  }
}

const ws = new Ws();
export default ws;
