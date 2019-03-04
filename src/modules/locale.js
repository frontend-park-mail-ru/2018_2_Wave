import bus from './bus';

class LocaleManager {
  constructor() {
    this.localeName = 'EN';
  }

  set locale(value) {
    this.localeName = value;
    bus.emit('localeChanged', value);
  }

  get locale() {
    return this.localeName;
  }
}

export default new LocaleManager();
