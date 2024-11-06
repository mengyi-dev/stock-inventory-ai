// Define a cache name
const CACHE_NAME = 'my-site-cache-v1';

// Define resources to cache
const urlsToCache = [
  '/',
  '/index.html',
  '/add-stock.html',
  '/clear-data.html',
  '/export.html',
  '/import.html',
  '/pos.html',
  '/stock-tracking.html',
  '/css/styles.css',
  '/js/main.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});



self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // If resource is found in cache, return it
      if (response) {
        return response;
      }
      // Otherwise, fetch from network and cache it for future use
      return fetch(event.request).then((networkResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    }).catch(() => {
      // Optional: provide fallback (like a default page) when offline
    })
  );
});
