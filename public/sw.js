const CACHE_NAME = "balneario-v1";
const urlsToCache = [
  "/",
  "/images/hero-piscina-termal.jpg",
  "/images/logo.png",
  "/images/icon-192.png",
  "/images/icon-512.png",
];

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
