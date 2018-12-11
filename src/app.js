import Router from './modules/router';
// import Terminal from './applications/terminal/terminal_app';
// import Menu from './applications/menu/menu_app';
// import Snake from './applications/snake/game_app';
import Game from './applications/game/game_app';

const game = new Game(document.body, 'https://kekmate.now.sh');

// import '../static/favicon.ico';

new Router(document.body)
  .registerApp('/game', game)
  .start();
//   .registerApp('/', Menu)
//   .registerApp('terminal', Terminal)
//   .registerApp('snake', Snake)
//   .start();


// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//     .register('./sw.js')
//     .catch(err => console.log({ err }));
// }

// import Frame from './applications/frame/frame_view';

// const frame = new Frame(document.body, '');
