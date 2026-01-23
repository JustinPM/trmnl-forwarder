const CACHE_NAME = 'trmnl-v9';
const ASSETS = ['./', './index.html', './manifest.json'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  // Completely bypass cache for TRMNL and Proxy to avoid stale images
  if (e.request.url.includes('cors-anywhere.com') || e.request.url.includes('usetrmnl.com')) return;
  
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
