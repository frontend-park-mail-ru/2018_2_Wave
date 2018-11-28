import busController from './busController';

class WsMessageParser {
  constructor() {
    this.models = {};
  }

  parseMessage(message) {
    if (message.status === 'STATUS_OK') {
      busController.emit('STATUS_OK', message);
    }
    if (typeof message === 'string') {
      busController.emit('data', message);
    } else if (message.status === 'STATUS_TICK') {
      busController.emit('STATUS_TICK', message.payload);
      const a = Object.keys(message.payload);

      Object.keys(message.payload).forEach((key) => {
        if (Object.keys(this.models).indexOf(key) !== -1) {
          this.models[key].forEach(model => model.setState(message.payload[key]), key);
        }
      });
    }
  }

  setModel(route, model) {
    if (!this.models[route]) {
      this.models[route] = [];
    }
    this.models[route].push(model);
  }
}

export default new WsMessageParser();
