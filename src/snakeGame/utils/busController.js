import bus from '../../modules/bus';

class busController {
  constructor() {
    this.setListeners = {};
  }

  setBusListeners(events) {
    Object.keys(events).forEach((event) => {
      bus.listen(event, events[event]);
      this.setListeners[event] = events[event];
    });
  }

  removeBusListeners(events) {
    Object.keys(events).forEach((event) => {
      bus.ignore(event, events[event]);
      delete this.setListeners.event;
    });
  }

  emit(event, data) {
    bus.emit(event, data);
  }
}

export default new busController();