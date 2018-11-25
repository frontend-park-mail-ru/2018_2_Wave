import Router from './modules/router';
import Terminal from './applications/terminal/terminal_app';
import Menu from './applications/menu/menu_app';
import Snake from './applications/snake/game_app';
import Chat from './applications/chat/chat_app';

import './style.css';

new Router(document.body)
  .registerApp('/', Menu)
  .registerApp('terminal', Terminal)
  .registerApp('chat', Chat)
  .registerApp('snake', Snake)
  .start();
