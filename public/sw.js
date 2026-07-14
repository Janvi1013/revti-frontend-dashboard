const VIDEO_REQUEST_PATTERN = /\.(?:mp4|webm|mov|m4v)(?:\?.*)?$/i;

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then((keys) => Promise.all(keys.map((key) => caches.delete(key)))),
    ])
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (
    request.destination === 'video' ||
    request.headers.has('range') ||
    VIDEO_REQUEST_PATTERN.test(url.pathname)
  ) {
    event.respondWith(fetch(request));
    return;
  }

  event.respondWith(fetch(request));
});
