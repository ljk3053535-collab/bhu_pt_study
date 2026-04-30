const CACHE_NAME = 'bhu-pt-study-v1';

// 오프라인에서도 열 수 있도록 캐시할 파일 목록
const CACHE_FILES = [
  '/bhu_pt_study/',
  '/bhu_pt_study/index.html',
  '/bhu_pt_study/manifest.json'
];

// 설치 시 캐시 저장
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CACHE_FILES))
  );
  self.skipWaiting();
});

// 활성화 시 이전 캐시 삭제
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// 요청 시 캐시 우선, 없으면 네트워크
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
