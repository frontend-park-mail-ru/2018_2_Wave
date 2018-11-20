import Router from './modules/router';

import Terminal from './applications/terminal/terminal_app';

// import './css/style.css';


new Router(document.body)
  .registerApp('/', Terminal)
  .start();


// const terminal = new Terminal(document.body);
// terminal.start();
