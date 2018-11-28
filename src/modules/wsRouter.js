class WsRouter {
  constructor() {
    this.parsers = {};
  }

  sendByRoute(message, status) {
    // пока не пресылается в какое приложение приходит сообщение
    // пока что хардкодим
    // стоит написать базовый класс для парсеров
    const route = 'snake_game';
    // this.parsers['snake_game'].parseMessage(message.body);
    this.parsers[route].parseMessage(message);
  }

  addMessageParser(route, parser) {
    this.parsers[route] = parser;
  }
}

export default new WsRouter();
