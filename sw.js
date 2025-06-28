// Service Worker for Word Search Game
// Enables offline functionality by caching external resources

const CACHE_NAME = 'word-search-v1';
const EXTERNAL_RESOURCES = [
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap',
  'https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecnFHGPc.woff2',
  'https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLGT9Z1xlFd2JQEk.woff2',
  'https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLDD4Z1xlFd2JQEk.woff2'
];

const LOCAL_RESOURCES = [
  '/',
  '/index.html',
  '/js/main.js',
  '/js/app.js',
  '/js/config/config.js',
  '/js/views/MainMenuView.js',
  '/js/views/GameView.js',
  '/js/views/CreditsView.js',
  '/js/managers/AudioManager.js',
  '/js/components/SettingsPopup.js',
  '/js/classes/localStorage.js',
  '/assets/sounds/click.mp3',
  '/assets/sounds/word-found.mp3',
  '/assets/sounds/word-try.mp3',
  '/assets/sounds/win.mp3',
  '/assets/sounds/background.mp3',
  '/assets/sounds/game-over.mp3',
  '/assets/sounds/game-win.mp3',
  '/assets/sounds/hover.mp3',
  '/assets/sounds/negative_beeps-6008.mp3'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching local resources...');
        // Cache local resources (don't fail if some don't exist)
        return Promise.allSettled(
          LOCAL_RESOURCES.map(url => 
            cache.add(url).catch(err => console.log(`Failed to cache ${url}:`, err))
          )
        );
      })
      .then(() => {
        console.log('Service Worker: Installed successfully');
        self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Activated');
      self.clients.claim();
    })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version if available
        if (response) {
          console.log('Service Worker: Serving from cache:', url);
          return response;
        }

        // Fetch from network and cache external resources
        return fetch(event.request)
          .then((networkResponse) => {
            // Only cache GET requests and successful responses
            if (event.request.method === 'GET' && networkResponse.status === 200) {
              // Check if it's an external resource we want to cache
              const isExternalResource = EXTERNAL_RESOURCES.some(resource => 
                url.includes(resource) || url.includes('fonts.gstatic.com')
              );
              
              if (isExternalResource || url.includes(self.location.origin)) {
                const responseClone = networkResponse.clone();
                caches.open(CACHE_NAME)
                  .then((cache) => {
                    console.log('Service Worker: Caching:', url);
                    cache.put(event.request, responseClone);
                  });
              }
            }
            
            return networkResponse;
          })
          .catch((error) => {
            console.log('Service Worker: Network fetch failed for:', url, error);
            // For navigation requests, return cached index.html as fallback
            if (event.request.mode === 'navigate') {
              return caches.match('/index.html');
            }
            throw error;
          });
      })
  );
});

// Handle service worker updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});