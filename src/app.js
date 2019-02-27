import '../static/favicon.ico';
import './style.pcss';

import bus from './modules/bus';
import appManager from './modules/app_manager';
import userService from './modules/userservice';

import Router from './modules/router';
import Loader from './applications/loader/loader';
import MainApp from './applications/main/main_app';
import Terminal from './applications/terminal/terminal_app';
// import Snake from './applications/snake/game_app';


new Loader(document.body)
  .start();


appManager
// .registerApp('snake', Snake)
  .registerApp('terminal', Terminal);

Promise.all([
  userService.update(),
])
  .then(appManager.start(MainApp, document.body))
  .then(new Router(appManager).start)
  .then(() => bus.emit('loaded'));


// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//     .register('./sw.js')
//     .catch(err => console.error({ err }));
// }
