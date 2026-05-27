const CACHE_NAME = 'pgm-kbb-v5'; // GANTI NAMA CACHE
const urlsToCache = [
  '/',
  '/index.html?v=5',
  '/style.css?v=5',
  '/script.js?v=5',
  '/assets/logo-pgm.png',
  '/assets/masjid-bg.svg'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // LANGSUNG AKTIF
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName); // HAPUS CACHE LAMA
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
