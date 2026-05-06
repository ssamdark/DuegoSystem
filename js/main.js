document.addEventListener('DOMContentLoaded', () => {

    const navbar = document.querySelector('.navbar');

    // -----------------------------------------------------------------------
    // 1. Hero Video Controls + Slogan Cycle
    // -----------------------------------------------------------------------
    const heroVideo = document.getElementById('hero-video');
    const videoToggle = document.getElementById('video-toggle');
    const videoProgressFill = document.getElementById('video-progress-fill');

    function initHeroSloganCycle() {
        const titleContainer = document.querySelector('.slogan-container');
        const descContainer = document.querySelector('.desc-container');
        if (!titleContainer || !descContainer || !heroVideo) return;

        const titles = titleContainer.querySelectorAll('.slogan-title');
        const descs = descContainer.querySelectorAll('.slogan-desc');
        if (titles.length === 0 || descs.length === 0) return;

        const transitionTime = 11.0;
        const exitDuration = 0.5;
        const videoDuration = 20.03;
        let lastState = -1;

        function updateSloganByTime() {
            const currentTime = heroVideo.currentTime;
            let currentState;
            if (currentTime < transitionTime - exitDuration) currentState = 0;
            else if (currentTime < transitionTime) currentState = 1;
            else if (currentTime < videoDuration - exitDuration) currentState = 2;
            else currentState = 3;

            if (currentState === lastState) return;
            titles.forEach(t => t.classList.remove('active', 'exit'));
            descs.forEach(d => d.classList.remove('active', 'exit'));

            if (currentState === 0) { titles[0]?.classList.add('active'); descs[0]?.classList.add('active'); }
            else if (currentState === 1) { titles[0]?.classList.add('exit'); descs[0]?.classList.add('exit'); }
            else if (currentState === 2) { titles[1]?.classList.add('active'); descs[1]?.classList.add('active'); }
            else if (currentState === 3) { titles[1]?.classList.add('exit'); descs[1]?.classList.add('exit'); }

            lastState = currentState;
        }

        heroVideo.addEventListener('timeupdate', updateSloganByTime);
        updateSloganByTime();
    }

    if (heroVideo && videoToggle && videoProgressFill) {
        initHeroSloganCycle();

        videoToggle.addEventListener('click', () => {
            const icon = videoToggle.querySelector('i');
            if (heroVideo.paused) {
                heroVideo.play();
                if (icon) icon.className = 'ri-pause-line';
            } else {
                heroVideo.pause();
                if (icon) icon.className = 'ri-play-line';
            }
        });

        heroVideo.addEventListener('timeupdate', () => {
            if (heroVideo.duration) {
                videoProgressFill.style.width = `${(heroVideo.currentTime / heroVideo.duration) * 100}%`;
            }
        });
    }

    // -----------------------------------------------------------------------
    // 2. Navbar Hover (메인 전용)
    // -----------------------------------------------------------------------
    if (navbar) {
        navbar.addEventListener('mouseenter', () => navbar.classList.add('is-open'));
        navbar.addEventListener('mouseleave', () => navbar.classList.remove('is-open'));
    }

    // -----------------------------------------------------------------------
    // 3. Navbar 스크롤 동작 — NHN 방식
    //    · 최상단: 투명
    //    · 스크롤 다운: 숨김
    //    · 스크롤 업: 흰 배경 네비 등장
    // -----------------------------------------------------------------------
    let lastScrollY = 0;

    function updateNavbarColor() {
        if (!navbar) return;
        const currentScrollY = window.scrollY;
        const scrollingDown = currentScrollY > lastScrollY;

        if (currentScrollY === 0) {
            navbar.classList.remove('is-open-sub', 'nav-hidden');
        } else if (scrollingDown) {
            navbar.classList.add('nav-hidden');
            navbar.classList.remove('is-open-sub');
        } else {
            navbar.classList.remove('nav-hidden');
            navbar.classList.add('is-open-sub');
        }

        lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', updateNavbarColor, { passive: true });
    requestAnimationFrame(() => {
        navbar.classList.remove('is-open-sub', 'nav-hidden', 'dark', 'is-open');
    });

    // -----------------------------------------------------------------------
    // 4. Tech Slider — IntersectionObserver로 진입 감지 후 초기화
    // -----------------------------------------------------------------------
    let isTechSliderInitialized = false;

    function initTechSlider() {
        const slider = document.querySelector('.tech-new-slider');
        const cards = document.querySelectorAll('.tech-new-card');
        const listItems = document.querySelectorAll('.tech-new-list li');
        const lineFill = document.querySelector('.line-fill');
        const prevBtn = document.querySelector('.t-nav-btn.prev');
        const nextBtn = document.querySelector('.t-nav-btn.next');
        const playBtn = document.querySelector('#tech-play-btn');

        if (!slider || cards.length === 0 || isTechSliderInitialized) return;
        isTechSliderInitialized = true;

        const originalCardsCount = cards.length;
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.classList.remove('active');
            slider.appendChild(clone);
        });

        const allCards = document.querySelectorAll('.tech-new-card');
        let currentIndex = 0;
        let isTransitioning = false;
        let autoplayTimer = null;

        function updateSlider(index, useTransition = true) {
            if (isTransitioning && useTransition) return;

            if (useTransition) {
                isTransitioning = true;
                slider.classList.remove('no-transition');
            } else {
                slider.classList.add('no-transition');
            }

            currentIndex = index;
            const activeIndex = currentIndex % originalCardsCount;
            allCards.forEach((card, i) => card.classList.toggle('active', i === currentIndex));
            listItems.forEach((item, i) => item.classList.toggle('active', i === activeIndex));

            if (lineFill) {
                const segmentWidth = 320 / originalCardsCount;
                lineFill.style.width = `${segmentWidth}px`;
                lineFill.style.left = `${activeIndex * segmentWidth}px`;
            }

            slider.style.transform = `translateX(${-currentIndex * 380}px)`;
            requestAnimationFrame(() => slider.classList.remove('no-transition'));
        }

        updateSlider(0, false);

        slider.addEventListener('transitionend', (e) => {
            if (e.target !== slider) return;
            isTransitioning = false;
            if (currentIndex >= originalCardsCount) {
                requestAnimationFrame(() => {
                    slider.classList.add('no-transition');
                    requestAnimationFrame(() => {
                        updateSlider(0, false);
                        requestAnimationFrame(() => slider.classList.remove('no-transition'));
                    });
                });
            }
            if (currentIndex < 0) {
                requestAnimationFrame(() => {
                    slider.classList.add('no-transition');
                    requestAnimationFrame(() => {
                        updateSlider(originalCardsCount - 1, false);
                        requestAnimationFrame(() => slider.classList.remove('no-transition'));
                    });
                });
            }
        });

        function startAutoplay() {
            stopAutoplay();
            autoplayTimer = setInterval(() => {
                if (!isTransitioning) updateSlider(currentIndex + 1);
            }, 3000);
        }

        function stopAutoplay() {
            if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; }
        }

        if (prevBtn) prevBtn.addEventListener('click', () => { stopAutoplay(); updateSlider(currentIndex - 1); startAutoplay(); });
        if (nextBtn) nextBtn.addEventListener('click', () => { stopAutoplay(); updateSlider(currentIndex + 1); startAutoplay(); });
        listItems.forEach((item, i) => item.addEventListener('click', () => { stopAutoplay(); updateSlider(i); startAutoplay(); }));
        allCards.forEach((card, i) => card.addEventListener('click', () => { stopAutoplay(); updateSlider(i % originalCardsCount); startAutoplay(); }));

        if (playBtn) {
            playBtn.addEventListener('click', () => {
                const icon = playBtn.querySelector('i');
                if (autoplayTimer) {
                    stopAutoplay();
                    icon.className = 'ri-play-line';
                } else {
                    startAutoplay();
                    icon.className = 'ri-pause-line';
                }
            });
        }

        startAutoplay();
    }

    const techSection = document.getElementById('tech');
    if (techSection) {
        const techObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    initTechSlider();
                    techObserver.disconnect();
                }
            });
        }, { threshold: 0.2 });
        techObserver.observe(techSection);
    }

    // -----------------------------------------------------------------------
    // 5. Vision 섹션 — IntersectionObserver로 is-expanded 토글
    // -----------------------------------------------------------------------
    const visionSection = document.getElementById('vision');
    if (visionSection) {
        const visionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    visionSection.classList.add('is-expanded');
                } else {
                    visionSection.classList.remove('is-expanded');
                }
            });
        }, { threshold: 0.5 });
        visionObserver.observe(visionSection);
    }

    // -----------------------------------------------------------------------
    // 6. Logo 클릭 — 페이지 최상단 이동
    // -----------------------------------------------------------------------
    const logoLink = document.querySelector('.logo');
    if (logoLink) {
        logoLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // -----------------------------------------------------------------------
    // 7. 모바일 GNB 오버레이
    // -----------------------------------------------------------------------
    const mToggle = document.getElementById('mobileToggle');
    const mOverlay = document.getElementById('mobileNavOverlay');
    const mClose = document.getElementById('mobileNavClose');
    if (mToggle && mOverlay) {
        const openNav = () => {
            mOverlay.classList.add('open');
            mToggle.classList.add('active');
            document.body.style.overflow = 'hidden';
        };
        const closeNav = () => {
            mOverlay.classList.remove('open');
            mToggle.classList.remove('active');
            document.body.style.overflow = '';
        };
        mToggle.addEventListener('click', () => {
            mOverlay.classList.contains('open') ? closeNav() : openNav();
        });
        mClose?.addEventListener('click', closeNav);
        mOverlay.addEventListener('click', e => {
            if (e.target === mOverlay) closeNav();
        });
        mOverlay.querySelectorAll('.m-nav-group-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const group = btn.closest('.m-nav-group');
                const isOpen = group.classList.contains('open');
                mOverlay.querySelectorAll('.m-nav-group.open').forEach(g => g.classList.remove('open'));
                if (!isOpen) group.classList.add('open');
            });
        });
        mOverlay.querySelectorAll('.m-nav-sub a').forEach(a => {
            a.addEventListener('click', closeNav);
        });
    }

});