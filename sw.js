const CACHE_NAME = 'trmnl-v4';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png'
];

// Install: Cache the app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Fetch: Network-first for images, Cache-first for UI
self.addEventListener('fetch', (event) => {
  const url = event.request.url;

  // Bypass cache for TRMNL images and Proxies
  if (url.includes('usetrmnl.com') || url.includes('corsproxy.io')) {
    return; // Let the browser fetch directly
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
