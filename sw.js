// Service Worker Installation
self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installing Service Worker...');
    event.waitUntil(
      caches.open('v1').then(function(cache) {
        console.log('[Service Worker] Caching App Shell...');
        return cache.addAll([
          '/',
          '/index.html',
          '/icon-192x192.png'
        ]);
      })
    );
  });
  
  // Service Worker Activation
  self.addEventListener('activate', function(event) {
    console.log('[Service Worker] Activating Service Worker...');
    return self.clients.claim();
  });
  
  // Fetching Files
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });
  