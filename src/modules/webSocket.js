import bus from './bus';

class Ws {
  constructor() {
    // this.host = window.location.host;
    this.bus = bus;

    // const address = `${window.location.protocol.replace('http', 'ws')}//${this.host}/ws`;
    const address = 'wss://chat.rasseki.com/chat';
    this.ws = new WebSocket(address);

    this.ws.onopen = (event) => {
      console.log(`WebSocket on address ${address} opened`);
      console.log(this.ws.onmessage);
      this.ws.onmessage = this.handleMessage.bind(this);

      this.ws.onclose = () => {
        console.log('WebSocket closed');
      };

      this.refreshTimer = setInterval(() => {
        this.send('empty');
      }, 30000);
    };
  }


  handleMessage(event) {
    const messageText = event;
    // console.log({ messageText });


    try {
      const message = JSON.parse(messageText.data);
      console.log(message.room_id);
      this.bus.emit(message.room_id, JSON.parse(message.payload));
    } catch (err) {
      console.error('smth went wront in handleMessage: ', err);
    }
  }

  send(signal, payload) {
    // костыль
    this.waitForConnection(() => this.ws.send(JSON.stringify({ room_id: 'manager', signal, payload })), 5000);
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
