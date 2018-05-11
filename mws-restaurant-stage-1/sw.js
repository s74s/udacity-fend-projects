const staticCacheName = 'rest-app-v1'

const urlsToCache = [
  'index.html',
  'restaurant.html',
  'data/restaurants.json',
  'js/dbhelper.js',
  'js/main.js',
  'js/restaurant_info.js',
  'css/styles.css',
]

for (let i = 1; i < 11; i += 1) {
  urlsToCache.push(`img/${i}.jpg`)
}

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(staticCacheName)
    .then((cache) => {
      console.log('Opened cache')
      return cache.addAll(urlsToCache)
    }))
})

self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request)
    .then((response) => {
      if (response) return response

      return fetch(event.request.clone()).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic')
          return response

        caches.open(staticCacheName)
          .then((cache) => cache.put(event.request, response.clone()))
        return response
      })
    }))
})

self.addEventListener('activate', (event) => {
  const cacheWhitelist = ['rest-app-v1']

  event.waitUntil(caches.keys().then(cacheNames =>
    Promise.all(cacheNames.map((name) => {
      if (cacheWhitelist.indexOf(name) === -1) {
        return caches.delete(name);
      }
    }))))
})