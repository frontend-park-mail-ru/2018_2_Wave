import Router from './modules/router';
import MainApp from './applications/main/main_app';
import Terminal from './applications/terminal/terminal_app';
import Snake from './applications/snake/game_app';

import '../static/favicon.ico';
import './style.pcss';

new Router(document.body, MainApp)
  .registerApp('terminal', Terminal)
  .registerApp('snake', Snake)
  .start();


if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./sw.js')
    .catch(err => console.error({ err }));
}
