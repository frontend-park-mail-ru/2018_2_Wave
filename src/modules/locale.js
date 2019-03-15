import bus from './bus';

class LocaleManager {
  constructor() {
    const { hostname } = window.location;
    console.log(hostname);

    switch (hostname) {
      case 'snakewave.com':
        this.localeName = 'EN';
        break;
      case 'snakewave.de':
        this.localeName = 'DE';
        break;
      default:
        this.localeName = 'RU';
        break;
    }
  }

  set locale(value) {
    this.localeName = value;
    bus.emit('localeChanged');
  }

  get locale() {
    return this.localeName;
  }
}

export default new LocaleManager();
