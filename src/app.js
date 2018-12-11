import Router from './modules/router';
import Menu from './applications/menu/menu_app';
// import Terminal from './applications/terminal/terminal_app';
// import Snake from './applications/snake/game_app';
import Game from './applications/game/game_app';

import '../static/favicon.ico';
import './style.pcss';

new Router(document.body)
  .registerApp('/', Menu)
  .registerGame('/magurl', Game, 'https://www.innogames.com/games/all-games/')
  .start();
