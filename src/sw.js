/* eslint no-restricted-globals: 1 */

const KEY = 'vawe!';
const { assets } = global.serviceWorkerOption;


self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(KEY)
      .then((cache) => {
        console.log('cache open');
        return cache.addAll(assets);
      })
      .catch(err => console.log({ err })),
  );
});


self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        return fetch(event.request)
          .then(response => caches.open(KEY)
            .then((cache) => {
              cache.put(event.request, response.clone());
              return response;
            }))
          .catch(() => cachedResponse);
      })
      .catch(error => console.log(error)),
  );
});
