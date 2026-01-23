const CACHE_NAME = 'trmnl-v7';
const ASSETS = ['./', './index.html', './manifest.json'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  // Directly fetch API and Proxy requests without caching
  if (e.request.url.includes('corsproxy.io') || e.request.url.includes('usetrmnl.com')) return;
  
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
