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
  .registerApp('test', Game, 'https://www.innogames.com/games/all-games/')
  .start();
