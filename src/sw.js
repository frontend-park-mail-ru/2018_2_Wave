/* eslint no-restricted-globals: 1 */

const KEY = 'vawe!';
const { assets } = global.serviceWorkerOption;


self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(KEY)
      .then((cache) => {
        return cache.addAll(assets);
      })
      .catch(err => console.log({ err })),
  );
});


self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((cachedResponse) => {
        if (!navigator.onLine && cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request)
          .then(response => caches
            .open(KEY)
            .then((cache) => {
              if (event.request.method === 'GET') {
                cache.put(event.request, response.clone());
              }
              return response;
            }));
      })
      .catch(error => console.log(error)),
  );
});
