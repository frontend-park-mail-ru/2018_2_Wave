import Router from './modules/router';
import Terminal from './applications/terminal/terminal_app';
import Snake from './applications/snake/game_app';
import Menu from './applications/menu/menu_app';
// import Widget from './widget/widget';

import './style.css';

new Router(document.body)
  .registerApp('/', Terminal)
  .registerApp('menu', Menu)
  .registerApp('terminal', Terminal)
  .registerApp('snake', Snake)
  .start();
