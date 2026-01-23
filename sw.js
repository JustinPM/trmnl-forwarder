const CACHE_NAME = 'trmnl-v8';
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(['./', './index.html', './manifest.json'])));
});

self.addEventListener('fetch', (e) => {
  // Always let TRMNL and Proxy requests bypass the service worker cache
  if (e.request.url.includes('cors-anywhere.com') || e.request.url.includes('usetrmnl.com')) return;
  
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
