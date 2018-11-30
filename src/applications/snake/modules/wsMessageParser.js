import busController from './busController';
import config from './wsConfig';

export default class WsMessageParser {
  constructor(owner) {
    this.owner = owner;
    this.models = {};
  }

  /**
   * @param {message from ws for parsing} message
   */
  parse(message) {
    // TODO uncomit on api change
    // if (message.status === config.STATUS_TOKEN) {
    //   this.owner.setUserToken(message.payload.user_token);
    // }

    console.log(message);
    if (message.user_token) {
      this.owner.setUserToken(message.user_token);
    }

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
