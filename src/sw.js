const staticCacheName = 'amplifi-cache-v1';
const cacheNameList = [
  staticCacheName
];
const urlList = [
  '/',
  '/bundle.js',
  '/style.css',
  '/pulse.css',
  '/assets/fonts/nexa_bold.otf',
  '/assets/fonts/nexa_light.otf'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCacheName).then(
      cache => cache.addAll(urlList)
    ).catch(
      err => console.log('Install failed:', err)
    )
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(
      cacheNames => Promise.all(
        cacheNames.map(cacheName => {
          if (cacheNameList.indexOf(cacheName) === -1)
            return caches.delete(cacheName)
        })
      )
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(
      response => response || fetch(event.request)
    )
  );
});
