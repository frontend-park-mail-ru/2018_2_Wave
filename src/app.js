import Router from './modules/router';
import Terminal from './applications/terminal/terminal_app';


new Router(document.body)
  .registerApp('/', Terminal)
  .start();
