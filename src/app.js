import Router from './modules/router';
import Terminal from './applications/terminal/terminal_app';
import Menu from './applications/menu/menu_app';

new Router(document.body)
  .registerApp('/', Menu)
  .registerApp('terminal', Terminal)
  .start();
