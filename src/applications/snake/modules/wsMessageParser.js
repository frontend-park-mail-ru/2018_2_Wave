import busController from './busController';
import config from './wsConfig';

let instance;

export default class WsMessageParser {
  constructor(owner) {
    if (!instance) {
      this.owner = owner;
      this.models = {};
      instance = this;
    }
    return instance;
  }

  /**
   * @param {message from ws for parsing} message
   */
  parse(message) {
    console.log('ws_message', message);

    if (message.status === 'STATUS_OK' || message.status === 'STATUS_DEAD') {
      busController.emit(message.status, message);
    }
    if (typeof message === 'string') {
      busController.emit('data', message);
    // } else if (message.status === 'STATUS_TICK') {
    } else {
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
