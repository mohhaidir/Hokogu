// Flag for enabling cache in production
var doCache = false;
var CACHE_NAME = 'Hokogu';
// Delete old caches
self.addEventListener('activate', event => {
  const currentCachelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys()
      .then(keyList =>
        Promise.all(keyList.map(key => {
          if (!currentCachelist.includes(key)) {
            return caches.delete(key);
          }
        }))
      )
  );
});
// This triggers when user starts the app
self.addEventListener('install', function(event) {
  if (doCache) {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(function(cache) {
          fetch('asset-manifest.json')
            .then(response => {
              response.json();
            })
            .then(assets => {
              // We will cache initial page and the main.js
              // We could also cache assets like CSS and images
              const urlsToCache = [
                '/',
                assets['main.js']
              ];
              cache.addAll(urlsToCache);
            })
        })
    );
  }
});
// Here we intercept request and serve up the matching files
self.addEventListener('fetch', function(event) {
  if (doCache) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  }
});

// const cacheName = 'hokogu-1.0';
// const cacheAssets = [
//     './index.html',
// ];

// self.addEventListener('install', (event) => {
//     console.log('Service Worker Installed');
//     event.waitUntil(
//         caches.open(cacheName)
//         .then((cache) => {
//             console.log('Service Worker: Caching Files');
//             return cache.addAll(cacheAssets);
//         })
//         .then(() => self.skipWaiting())
//     );
// });

// self.addEventListener('activate', (event) => {
//     console.log('Service Worker Activated');
//     event.waitUntil(
//         caches.keys().then(cacheName => {
//             return Promise.all(
//                 cacheName.map(cache => {
//                     if (cache !== cacheName) {
//                         console.log('Service Worker: Clearing Old Cache');
//                         return caches.delete(cache);
//                     }
//                 })
//             )
//         })
//     );
// })

// self.addEventListener('fetch', event => {
//     console.log('Service Worker: Fetching');
//     // event.respondWith(
//     //     caches.match(event.request, {ignoreSearch:true}).then(response => {
//     //       return response || fetch(event.request);
//     //     })
//     // );
//     event.respondWith(
//       fetch(event.request)
//         .then(res => {
//             const resClone = res.clone();

//             caches
//                 .open(cacheName)
//                 .then(cache => {
//                     cache.put(e.request, resClone);
//                 })
//             return res;
//         }).catch(err => caches.match(e.request).then(res => res))
//     );
// });