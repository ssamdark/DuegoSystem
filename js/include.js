/**
 * include.js
 * header.html / footer.html 컴포넌트를 fetch()로 로드
 */

async function loadComponent(selector, url) {
    const el = document.querySelector(selector);
    if (!el) return;
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`${url} 로드 실패: ${res.status}`);
        el.innerHTML = await res.text();
    } catch (err) {
        console.error('[include.js]', err);
    }
}

(async () => {
    // 병렬 로드로 속도 향상
    await Promise.all([
        loadComponent('#header-wrap', '/components/header.html'),
        loadComponent('#footer-wrap', '/components/footer.html'),
    ]);

    // 로드 완료 후 common.js 재실행 트리거
    document.dispatchEvent(new Event('componentsLoaded'));
})();