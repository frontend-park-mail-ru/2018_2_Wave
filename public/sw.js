const KEY = 'lesson-6-key';

this.addEventListener('install', (event) => {
  console.log('Service worker установлен');
  event.waitUntil(
    // находим Cache-объект с нашим именем
    caches
      .open(KEY)
      .then(cache => cache.addAll([
        // '/',
        // загружаем в наш cache необходимые файлы
        // '/index.html',
        // '/js/script.js',
        // '/js/components/Board/Board.tmpl.js',
        // '/js/components/Board/Board.mjs',
        // '/js/components/Board/Board.tmpl.xml',
        // '/js/components/Board/Board.css',
        // '/js/modules/ajax.js',
        // '/styles/main.css',
        // '/scripts/UsersService.js',
        // '/scripts/main.js',
        // '/scripts/Router.js',
        // '/scripts/MenuView.js',
        // '/scripts/BaseView.js',
        // '/scripts/bus.js',
        // '/scripts/ScoreboardView.js',

        '/',
        '/favicon.ico',
        '/index.html',
        '/app.bundle.js',
      ])),
  );
});

this.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (navigator.onLine) {
          return fetch(event.request);
        }

        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request);
      })
      .catch((err) => {
        console.log(err.stack || err);
      }),
  );
});
