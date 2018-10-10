class Bus {
  constructor() {
    this.listeners = {};
  }


  listen(event, listener) {
    (this.listeners[event] || (this.listeners[event] = [])).push(listener);
  }

  ignore(event, listener) {
    if (!this.listeners[event]) return;
    if (listener) {
      this.listeners[event] = this.listeners[event].filter(l => l !== listener);
    } else {
      this.listeners[event] = [];
    }
  }

  emit(event, data = []) {
    if (!this.listeners[event]) return;
    this.listeners[event].forEach(l => l(...data));
  }
}

const bus = new Bus();
export default bus;
