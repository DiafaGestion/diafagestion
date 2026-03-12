const CACHE_NAME = 'diafagestion-v33';

// À l'installation : ne PAS mettre en cache — toujours charger depuis réseau
self.addEventListener('install', e => {
  self.skipWaiting(); // Activer immédiatement sans attendre
});

// À l'activation : supprimer TOUS les anciens caches et prendre le contrôle
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
     .then(() => {
       // Forcer le rechargement de tous les onglets ouverts
       return self.clients.matchAll({ type: 'window' }).then(clients => {
         clients.forEach(client => client.navigate(client.url));
       });
     })
  );
});

// NETWORK FIRST : toujours chercher sur le réseau, cache seulement en fallback
self.addEventListener('fetch', e => {
  // Ne pas intercepter les requêtes Firebase/CDN externes
  const url = new URL(e.request.url);
  if (url.hostname !== location.hostname) {
    return; // Laisser passer sans interception
  }
  
  e.respondWith(
    fetch(e.request, { cache: 'no-store' })
      .then(response => response)
      .catch(() => caches.match('./index.html'))
  );
});
