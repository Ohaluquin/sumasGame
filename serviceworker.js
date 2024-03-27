const cacheName = 'sumasGame-cache-v1';
const assets = [
  '/',
  '/index.html',
  '/estilo.css',
  '/triks.js',
  '/sumasGame.ico',
  '/pizarra.png',
  '/tick.mp3',
  '/error_sound.mp3',
  '/dificil.png',
  '/expertor.png',
  '/facil.png',
  '/intermedio.png',
  '/principiante.png'
];

// Instalar el Service Worker y precargar los recursos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(assets);
      })
  );
});

// Intercepta las solicitudes de red y devuelve los recursos desde la caché
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cacheResponse => {
        return cacheResponse || fetch(event.request);
      })
  );
});
