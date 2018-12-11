import Router from './modules/router';
// import Terminal from './applications/terminal/terminal_app';
import Menu from './applications/menu/menu_app';
// import Snake from './applications/snake/game_app';

// import '../static/favicon.ico';

//  new Router(document.body)
//   .registerApp('/', Menu)
//   .registerApp('terminal', Terminal)
//   .registerApp('snake', Snake)
//   .start();


// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//     .register('./sw.js')
//     .catch(err => console.log({ err }));
// }

/*
import Frame from './applications/frame/frame_view';

const frame = new Frame(document.body);
frame.draw('https://www.innogames.com/games/all-games/');
*/

import Game from './applications/game/game_app';

new Router(document.body)
  .registerApp('/', Menu)
  .registerGame('/magurl', Game, 'https://www.innogames.com/games/all-games/')
  .start();
