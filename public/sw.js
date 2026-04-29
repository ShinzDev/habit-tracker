const CACHE_NAME = 'habit-tracker-cache-v2'; // Bumped version

const urlsToCache = [
  '/',
  '/login',
  '/signup',
  '/dashboard',
  '/manifest.json'
];

// 1. Install Event: Cache the basic URLs
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // Force the new service worker to activate immediately
});

// 2. Activate Event: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 3. Fetch Event: Dynamic Caching
self.addEventListener('fetch', (event) => {
  // Only cache GET requests that are HTTP or HTTPS
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // If we have it in the cache, return it immediately
      if (cachedResponse) {
        return cachedResponse;
      }

      // If not, fetch it from the network
      return fetch(event.request).then((networkResponse) => {
        // Only cache valid responses
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        // Clone the response (you can only use a stream once)
        const responseToCache = networkResponse.clone();

        // Save this new file to the cache for next time!
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      }).catch(() => {
        // If both cache and network fail, return a basic offline fallback
        return new Response('Offline Mode', {
          headers: { 'Content-Type': 'text/plain' }
        });
      });
    })
  );
});