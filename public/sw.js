

const CACHE_NAME = "rideshare-v4";
const OFFLINE_URL = "/offline.html";

const STATIC_FILES = [
  "/",
  OFFLINE_URL,
  "/manifest.webmanifest",
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
              key.startsWith("rideshare-") &&
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

  if (url.pathname === "/api/udhetimet") {
    event.respondWith(
      (async () => {
        try {
          const response = await fetch(request);

          if (response.ok) {
            const cache = await caches.open(CACHE_NAME);
            await cache.put(request, response.clone());
          }

          return response;
        } catch {
          const cached = await caches.match(request);

          return (
            cached ||
            Response.json(
              { error: "Lista nuk është e disponueshme offline." },
              { status: 503 }
            )
          );
        }
      })()
    );

    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const response = await fetch(request);

          if (response.ok) {
            const cache = await caches.open(CACHE_NAME);

            if (
              url.pathname === "/" ||
              /^\/udhetimi\/[^/]+\/?$/.test(url.pathname) ||
              /^\/udhetimi\/[^/]+\/kerkesa\/?$/.test(url.pathname)
            ) {
              await cache.put(request, response.clone());
            }
          }

          return response;
        } catch {
          const cachedPage = await caches.match(request);

          if (cachedPage) {
            return cachedPage;
          }

          if (url.pathname === "/") {
            const cachedHome = await caches.match("/");
            if (cachedHome) return cachedHome;
          }

          const offlinePage = await caches.match(OFFLINE_URL);

          return (
            offlinePage ||
            new Response("Je offline. Provo përsëri.", {
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

  event.respondWith(
    (async () => {
      const cached = await caches.match(request);

      if (cached) return cached;

      try {
        return await fetch(request);
      } catch {
        return new Response("", { status: 503 });
      }
    })()
  );
});
