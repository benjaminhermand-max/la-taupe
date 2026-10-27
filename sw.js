/* La Taupe — service worker
 * Réseau d'abord (pour toujours avoir la dernière version),
 * cache en secours (pour jouer sans connexion).
 */
var CACHE = 'la-taupe-v7';
var FILES = [
  './', 'index.html', 'paires.js', 'manifest.json',
  'assets/icone-192.png', 'assets/icone-512.png', 'assets/favicon.png',
  'assets/taupe-pointez.mp4'
];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  // Les vidéos sont demandées par morceaux : on sert directement le cache si possible.
  if (e.request.headers.get('range')) {
    e.respondWith(caches.match(e.request.url).then(function (r) { return r || fetch(e.request); }));
    return;
  }
  e.respondWith(
    fetch(e.request).then(function (res) {
      if (res && res.ok && new URL(e.request.url).origin === location.origin) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
      }
      return res;
    }).catch(function () {
      return caches.match(e.request).then(function (r) { return r || caches.match('index.html'); });
    })
  );
});
