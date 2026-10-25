const CACHE_NAME = "rideshare-public-v1";
const OFFLINE_URL = "/offline.html";
const API_URL = "/api/udhetimet";

const STATIC_FILES = [
  OFFLINE_URL,
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      for (const url of STATIC_FILES) {
        try {
          const response = await fetch(url);
          if (response.ok) {
            await cache.put(url, response);
          }
        } catch {
          console.warn("Nuk u ruajt në cache:", url);
        }
      }

      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();

      await Promise.all(
        keys
          .filter(
            (key) =>
              key.startsWith("rideshare-public-") &&
              key !== CACHE_NAME
          )
          .map((key) => caches.delete(key))
      );

      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (
    request.method !== "GET" ||
    url.origin !== self.location.origin
  ) {
    return;
  }

  if (url.pathname === API_URL) {
    event.respondWith(
      (async () => {
        try {
          const response = await fetch(request);

          if (!response.ok) {
            throw new Error("Serveri nuk e ktheu listën.");
          }

          const savedAt = new Date().toISOString();
          const headers = new Headers(response.headers);

          headers.set("x-rideshare-saved-at", savedAt);
          headers.set("x-rideshare-source", "network");

          const responseToReturn = new Response(
            await response.clone().arrayBuffer(),
            {
              status: response.status,
              statusText: response.statusText,
              headers,
            }
          );

          const cache = await caches.open(CACHE_NAME);
          await cache.put(API_URL, responseToReturn.clone());

          return responseToReturn;
        } catch {
          const cache = await caches.open(CACHE_NAME);
          const cached = await cache.match(API_URL);

          if (cached) {
            const headers = new Headers(cached.headers);
            headers.set("x-rideshare-source", "cache");

            return new Response(await cached.arrayBuffer(), {
              status: cached.status,
              statusText: cached.statusText,
              headers,
            });
          }

          return Response.json(
            { error: "Lista nuk është e disponueshme offline." },
            { status: 503 }
          );
        }
      })()
    );

    return;
  }

  if (request.mode === "navigate") {
    if (
      url.pathname !== "/" &&
      url.pathname !== OFFLINE_URL
    ) {
      return;
    }

    event.respondWith(
      (async () => {
        try {
          return await fetch(request);
        } catch {
          const cache = await caches.open(CACHE_NAME);
          const offlinePage = await cache.match(OFFLINE_URL);

          return (
            offlinePage ||
            new Response("Je offline. Hape lexuesin offline.", {
              headers: {
                "Content-Type": "text/plain; charset=utf-8",
              },
            })
          );
        }
      })()
    );

    return;
  }

  if (STATIC_FILES.includes(url.pathname)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match(url.pathname);

        if (cached) return cached;

        return fetch(request);
      })()
    );
  }
});