import Router from './modules/router';
import MainApp from './applications/menu/menu_app';
import Terminal from './applications/terminal/terminal_app';
import Snake from './applications/snake/game_app';
import Game from './applications/frame/game_app';

import '../static/favicon.ico';
import './style.pcss';

new Router(document.body, MainApp)
  .registerApp('terminal', Terminal)
  .registerApp('snake', Snake)
  .registerApp('test', Game, '//v6p9d9t4.ssl.hwcdn.net/html/1170743/index.html')
  .start();
