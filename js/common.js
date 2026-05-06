/**
 * common.js — 서브 페이지 전용
 * 메인 페이지에서는 로드하지 않음 (index.html에서 제거)
 */

function initCommon() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    if (navbar.dataset.initialized) return;
    navbar.dataset.initialized = 'true';

    // -----------------------------------------------
    // 1. GNB Mega Menu (Hover)
    // -----------------------------------------------
    navbar.addEventListener('mouseenter', () => navbar.classList.add('is-open'));
    navbar.addEventListener('mouseleave', () => navbar.classList.remove('is-open'));

    // -----------------------------------------------
    // 2. 서브 페이지 스크롤 네비 동작
    //    · 기본: 흰 배경 (is-open-sub) 고정
    //    · 스크롤 다운: 숨김
    //    · 스크롤 업: 다시 등장
    // -----------------------------------------------
    const isSubPage = document.body.classList.contains('is-sub-page');
    if (isSubPage) {
        navbar.classList.add('is-open-sub');

        const isMobile = () => window.innerWidth <= 1024;
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            if (isMobile()) return; // 모바일에서는 항상 고정

            const currentScrollY = window.scrollY;
            const scrollingDown = currentScrollY > lastScrollY;

            if (scrollingDown && currentScrollY > 10) {
                navbar.classList.add('nav-hidden');
                navbar.classList.remove('is-open-sub');
            } else {
                navbar.classList.remove('nav-hidden');
                navbar.classList.add('is-open-sub');
            }

            lastScrollY = currentScrollY;
        }, { passive: true });
    }

    // -----------------------------------------------
    // 3. 모바일 GNB 오버레이
    // -----------------------------------------------
    initMobileNav();

    // -----------------------------------------------
    // 4. Back to Top
    // -----------------------------------------------
    const backToTop = document.querySelector('.back-to-top-sub');
    if (backToTop) {
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // -----------------------------------------------
    // 5. 현재 페이지 GNB active 감지
    // -----------------------------------------------
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-item').forEach(item => {
        const links = item.querySelectorAll('.sub-menu a');
        links.forEach(link => {
            const linkPath = new URL(link.href, window.location.origin).pathname;
            if (currentPath === linkPath) item.classList.add('active');
        });
    });
}

function initMobileNav() {
    const toggle = document.getElementById('mobileToggle');
    const overlay = document.getElementById('mobileNavOverlay');
    const closeBtn = document.getElementById('mobileNavClose');
    if (!toggle || !overlay) return;

    const open = () => {
        overlay.classList.add('open');
        toggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const close = () => {
        overlay.classList.remove('open');
        toggle.classList.remove('active');
        document.body.style.overflow = '';
    };

    toggle.addEventListener('click', () => {
        overlay.classList.contains('open') ? close() : open();
    });

    closeBtn?.addEventListener('click', close);

    overlay.addEventListener('click', e => {
        if (e.target === overlay) close();
    });

    overlay.querySelectorAll('.m-nav-group-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const group = btn.closest('.m-nav-group');
            const isOpen = group.classList.contains('open');
            overlay.querySelectorAll('.m-nav-group.open').forEach(g => g.classList.remove('open'));
            if (!isOpen) group.classList.add('open');
        });
    });

    overlay.querySelectorAll('.m-nav-sub a').forEach(a => {
        a.addEventListener('click', close);
    });
}

document.addEventListener('DOMContentLoaded', initCommon);
document.addEventListener('componentsLoaded', initCommon);