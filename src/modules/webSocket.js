import bus from './bus';

class Ws {
  constructor() {
    // this.host = window.location.host;
    this.bus = bus;

    // const address = `${window.location.protocol.replace('http', 'ws')}//${this.host}/ws`;
    const address = 'ws://127.0.0.1:9600/conn/ws';
    this.ws = new WebSocket(address);

    this.ws.onopen = (event) => {
      console.log(`WebSocket on address ${address} opened`);
      console.dir(this.ws);
      console.log(this.ws.onmessage);
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
    // костыль
    this.waitForConnection(_ => this.ws.send(JSON.stringify({ type, payload })), 5000);
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
