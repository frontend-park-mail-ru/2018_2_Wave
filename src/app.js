import AppManager from './modules/app_manager';
import Router from './modules/router';
import Loader from './applications/loader/loader';
import MainApp from './applications/main/main_app';
import Terminal from './applications/terminal/terminal_app';
import Snake from './applications/snake/game_app';

import bus from './modules/bus';

import '../static/favicon.ico';
import './style.pcss';

new Loader(document.body)
  .start();

new AppManager(MainApp)
  .registerApp('terminal', Terminal)
  .registerApp('snake', Snake)
  .start();

new Router(document.body, MainApp)
  .start();

bus.emit('loaded');

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//     .register('./sw.js')
//     .catch(err => console.error({ err }));
// }
