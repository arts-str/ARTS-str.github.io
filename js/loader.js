(function () {
    const loaderEl    = document.getElementById('loader');
    const barEl       = document.getElementById('loader-bar');
    const statusEl    = document.getElementById('loader-status');
    const heroSection = document.getElementById('hero-section');

    // Don't show loader when navigating to a project modal (?0, ?1, etc.)
    if (!loaderEl || !heroSection || window.location.search !== '') {
        if (loaderEl) loaderEl.remove();
        return;
    }

    const HARD_TIMEOUT = 15000;
    let dismissed = false;

    function setProgress(pct) {
        if (barEl) barEl.style.width = Math.min(100, Math.round(pct)) + '%';
    }

    function dismiss() {
        if (dismissed) return;
        dismissed = true;
        clearTimeout(hardTimer);
        clearTimeout(debounceTimer);
        setProgress(100);
        if (statusEl) statusEl.textContent = 'READY';
        setTimeout(() => {
            loaderEl.classList.add('loader-done');
            loaderEl.addEventListener('transitionend', () => loaderEl.remove(), { once: true });
            setTimeout(() => { if (loaderEl.parentNode) loaderEl.remove(); }, 1000);
        }, 280);
    }

    const hardTimer = setTimeout(dismiss, HARD_TIMEOUT);

    function waitForHeroMedia() {
        // Query AFTER all innerHTML += iterations are done
        const media = Array.from(heroSection.querySelectorAll('img, video'));
        if (media.length === 0) { dismiss(); return; }

        let loaded = 0;
        const total = media.length;

        function onOne() {
            loaded++;
            setProgress((loaded / total) * 100);
            if (loaded >= total) dismiss();
        }

        media.forEach(el => {
            if (el.tagName === 'IMG') {
                // complete check: img may have already loaded before we got here
                if (el.complete && el.naturalWidth > 0) {
                    onOne();
                } else {
                    el.addEventListener('load',  onOne, { once: true });
                    el.addEventListener('error', onOne, { once: true });
                }
            } else {
                // video: readyState 2 = HAVE_CURRENT_DATA, enough to show first frame
                if (el.readyState >= 2) {
                    onOne();
                } else {
                    el.addEventListener('loadeddata', onOne, { once: true });
                    el.addEventListener('error',      onOne, { once: true });
                }
            }
        });
    }

    // Debounce: hero-script does innerHTML += N times in a loop.
    // Each += fires a mutation. Wait until mutations stop for 100ms,
    // THEN query — all cards are in the DOM at that point.
    let debounceTimer = null;

    const observer = new MutationObserver(() => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            observer.disconnect();
            waitForHeroMedia();
        }, 100);
    });

    observer.observe(heroSection, { childList: true, subtree: true });

    // Pulse
    const pulseTexts = ['LOADING', 'LOADING .', 'LOADING ..', 'LOADING ...'];
    let pulseIdx = 0;
    const pulseTimer = setInterval(() => {
        if (dismissed) { clearInterval(pulseTimer); return; }
        if (statusEl) statusEl.textContent = pulseTexts[pulseIdx++ % pulseTexts.length];
    }, 400);
})();
