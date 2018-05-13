const CACHE_NAME = 'restaurant-cache-v1'

const urlsToCache = [
  '/',
  './index.html',
  './restaurant.html',
  './css/styles.css',
  './js/dbhelper.js',
  './js/main.js',
  './js/restaurant_info.js'
];

for (let i = 1; i < 11; i += 1) {
  // push imgs urls to array
  urlsToCache.push(`./img/${i}.jpg`)
}

// SW Install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then((cache) => {
      console.log('Opened new cache')
      return cache.addAll(urlsToCache)
    })
  )
})

// SW Activate
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

// Fetch Listener
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true })
    .then((response) =>  response || fetch(event.request))
  )
})