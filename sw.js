const CACHE_NAME = 'trmnl-v3';
const ASSETS = ['./', './index.html', './manifest.json'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (event) => {
  // IMPORTANT: Do not intercept proxy requests or TRMNL API calls
  if (event.request.url.includes('api.allorigins.win') || event.request.url.includes('usetrmnl.com')) {
    return; // Let the browser handle these normally
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
