const CACHE_NAME = 'dynamicalabel-v1';

const urlsToCache = [
  '/dynamicalabel/',
  '/dynamicalabel/index.html',
  '/dynamicalabel/style.css',
  '/dynamicalabel/script.js',
  '/dynamicalabel/manifest.json',
  '/dynamicalabel/icons/icon-192.png',
  '/dynamicalabel/icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
