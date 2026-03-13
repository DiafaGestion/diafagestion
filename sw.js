const CACHE_NAME = 'diafagestion-v78';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// URLs externes à ne JAMAIS mettre en cache (Firebase, fonts, CDN tiers)
const NEVER_CACHE = [
  'gstatic.com',
  'googleapis.com',
  'firebaseio.com',
  'firestore.googleapis.com',
  'firebase.googleapis.com',
  'cdnjs.cloudflare.com'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = e.request.url;

  // Laisser passer sans cache : Firebase, CDN externes, requêtes POST
  if (NEVER_CACHE.some(domain => url.includes(domain)) || e.request.method !== 'GET') {
    e.respondWith(fetch(e.request));
    return;
  }

  // Network-first pour les fichiers locaux
  e.respondWith(
    fetch(e.request).then(response => {
      if (response && response.status === 200) {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
      }
      return response;
    }).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});
