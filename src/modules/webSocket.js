export default class Ws {
  constructor(mesageParser) {
    // this.host = window.location.host;
    this.mesageParser = mesageParser;

    this.host = 'snake.rasseki.com';
    this.address = `${window.location.protocol.replace('http', 'ws')}//${this.host}/conn/ws`;
  }

  connect() {
    this.ws = new WebSocket(this.address);

    this.ws.onerror = (error) => {
      console.log('WebSocket connection failed', error);
    };

    this.ws.onopen = (event) => {
      console.log(`WebSocket on address ${this.address} opened`);
      this.ws.onmessage = this.handleMessage.bind(this);

      this.ws.onclose = () => {
        this.mesageParser.emit('close');
      };
    };
  }

  getReadyState() {
    return this.ws.readyState;
  }

  handleMessage(event) {
    try {
      const message = JSON.parse(event.data);
      this.mesageParser.parse(message);
    } catch (err) {
      console.error('smth went wront in handleMessage: ', err);
    }
  }

  send(data) {
    // костыль
    this.waitForConnection(() => { console.log('send', data); this.ws.send(JSON.stringify(data)); }, 0);
  }

  waitForConnection(callback, interval) {
    if (this.ws.readyState === 1) {
      callback();
    } else {
      const that = this;
      setTimeout(() => {
        that.waitForConnection(callback, interval);
      }, interval);
    }
  }

  close() {
    this.ws.close();
  }
}
