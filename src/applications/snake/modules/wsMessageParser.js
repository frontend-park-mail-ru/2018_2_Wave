import busController from './busController';

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
    // console.log('ws_message', message);

    if (message.status === 'STATUS_OK'
    || message.status === 'STATUS_DEAD'
    || message.status === 'quick_search_status'
    || message.status === 'quick_search_accept_status'
    || message.status === 'quick_search_ready'
    || message.status === 'quick_search_done'
    || message.status === 'quick_search_added'
    || message.status === 'quick_search_removed'
    || message.status === 'quick_search_kick'
    || message.status === 'quick_search_failed'
    || message.status === 'win') {
      busController.emit(message.status, message);
    } else if (message.status === 'STATUS_TICK'
      || message.status === 'STATUS_TOKEN') {
      busController.emit('STATUS_TICK', message.payload);
      Object.keys(message.payload).forEach((key) => {
        if (Object.keys(this.models).indexOf(key) !== -1) {
          this.models[key].forEach((model) => {
            if (model && typeof model.setState === 'function') {
              model.setState(message.payload[key]);
            }
          }, key);
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
