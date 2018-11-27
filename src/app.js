import Router from './modules/router';
import Terminal from './applications/terminal/terminal_app';
import Menu from './applications/menu/menu_app';
import Snake from './applications/snake/game_app';

new Router(document.body)
  .registerApp('/', Menu)
  .registerApp('terminal', Terminal)
  .registerApp('snake', Snake)
  .start();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js', { scope: '/' })
    .then((registration) => {
      // Registration was successful
      console.log('SW registration OK:', registration);
    })
    .catch((err) => {
      // registration failed :(
      console.log('SW registration FAIL:', err);
    });
}
