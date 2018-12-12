import bus from '../../../modules/bus';

class BusController {
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

  emit(event, ...data) {
    // console.log('emit', event, data);
    bus.emit(event, ...data);
  }
}

export default new BusController();
