import busController from './busController';

class WsMessageParser {
  constructor() {
    this.models = {};
  }

  parseMessage(message) {
    if (typeof message === 'string') {
      busController.emit('data', parseInt(message, 10));
    } else if (message.status === 'STATUS_TICK') {
      busController.emit('STATUS_TICK', message.payload);
      const a = Object.keys(message.payload);

      Object.keys(message.payload).forEach((key) => {
        console.log(key);
        if (Object.keys(this.models).indexOf(key) !== -1) {
          this.models[key].setState(message.payload[key]);
        }
      });
    }
  }

  setModel(route, model) {
    this.models[route] = model;
  }
}

export default new WsMessageParser();
