const heroContainer = document.getElementById('hero-section');
const homeAnchors   = document.getElementById('home-anchors');
const heroFwd       = document.getElementById('hero-next');
const heroBck       = document.getElementById('hero-back');

let autoscrollTimer = null;   // setTimeout handle for scheduling next advance
let interacting     = false;  // true while user is touching/dragging

/* ── Helpers ─────────────────────────────────────────────── */

function slideWidth() {
    const first = heroContainer.children[0];
    return first ? first.clientWidth : heroContainer.clientWidth;
}

function currentIndex() {
    return Math.round(heroContainer.scrollLeft / slideWidth());
}

function slideCount() {
    return heroContainer.children.length;
}

/** Scroll to an exact slide index with smooth behaviour */
function goTo(index) {
    const total = slideCount();
    const i = ((index % total) + total) % total; // wrap
    heroContainer.scrollTo({ left: i * slideWidth(), behavior: 'smooth' });
}

/** Schedule the next autoscroll tick (5 s idle → then every 3 s) */
function scheduleAutoscroll(delay = 5000) {
    clearTimeout(autoscrollTimer);
    autoscrollTimer = setTimeout(function tick() {
        if (interacting) return; // don't advance while user is touching
        goTo(currentIndex() + 1);
        // After scrolling, wait for the animation to finish then schedule next
        // scrollend fires when snap settles; fall back to 800 ms otherwise
        let settled = false;
        const onEnd = () => {
            if (settled) return;
            settled = true;
            heroContainer.removeEventListener('scrollend', onEnd);
            scheduleAutoscroll(3000);
        };
        heroContainer.addEventListener('scrollend', onEnd, { once: true });
        setTimeout(onEnd, 900); // fallback if scrollend never fires
    }, delay);
}

function cancelAutoscroll() {
    clearTimeout(autoscrollTimer);
    autoscrollTimer = null;
}

/* ── JSON load ───────────────────────────────────────────── */

fetchURL('assets/hero.json').then(heroProjects => {
    heroProjects.projects.forEach((heroProject, index) => {
        heroContainer.innerHTML += returnHeroCard(heroProject, index);
    });
    homeAnchors.innerHTML += returnAnchors(heroProjects.projects);
}).then(() => {
    handleHeroAnchors();
    scheduleAutoscroll(5000);

    for (const anchor of homeAnchors.children) {
        anchor.addEventListener('click', () => {
            cancelAutoscroll();
            scheduleAutoscroll(5000);
        });
    }
});

/* ── Card / anchor builders ──────────────────────────────── */

function returnHeroCard(heroProject, index) {
    const imgTypes = ['png', 'jpg', 'jpeg', 'webp', 'gif'];
    const isImg = imgTypes.includes(heroProject.assetURL.split('.').pop().toLowerCase());
    const media = isImg
        ? `<img draggable="false" style="${heroProject.injectedStyle}" src="assets/img/${heroProject.assetURL}" alt="">`
        : `<video draggable="false" style="${heroProject.injectedStyle}" autoplay muted loop playsinline src="assets/img/${heroProject.assetURL}"></video>`;

    return `
    <section class="hero-card" id="hero-${index}">
        <div class="hero-background">${media}</div>
        <div style="color:${heroProject.color}; border: 1px dashed ${heroProject.color};" class="hero-content">
            <h1>${heroProject.title}</h1>
            <p>${heroProject.description}</p>
            <a href="${heroProject.href}" class="hero-engage">Ver más</a>
        </div>
    </section>`;
}

function returnAnchors(heroProjects) {
    return heroProjects.map((e, i) =>
        `<a class="hero-anchor" href="#hero-${i}" data-section="hero-${i}">&bull;</a>`
    ).join('');
}

function handleHeroAnchors() {
    const cards   = document.querySelectorAll('.hero-card');
    const anchors = document.querySelectorAll('.hero-anchor');

    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                anchors.forEach(a => a.classList.toggle('active-gallery-anchor', a.dataset.section === id));
            }
        });
    }, { threshold: 0.9, root: heroContainer });

    cards.forEach(c => obs.observe(c));
}

/* ── Button clicks ───────────────────────────────────────── */

heroFwd.addEventListener('click', () => {
    cancelAutoscroll();
    goTo(currentIndex() + 1);
    scheduleAutoscroll(5000);
});

heroBck.addEventListener('click', () => {
    cancelAutoscroll();
    goTo(currentIndex() - 1);
    scheduleAutoscroll(5000);
});

/* ── Touch ───────────────────────────────────────────────── */

heroContainer.addEventListener('touchstart', () => {
    interacting = true;
    cancelAutoscroll();
}, { passive: true });

heroContainer.addEventListener('touchend', () => {
    interacting = false;
    scheduleAutoscroll(5000);
}, { passive: true });

/* ── Mouse drag ──────────────────────────────────────────── */
(function initHeroDrag() {
    let isDown    = false;
    let startX    = 0;
    let scrollStart = 0;
    let didDrag   = false;
    const THRESHOLD = 6;

    heroContainer.style.cursor = 'grab';

    heroContainer.addEventListener('mousedown', (e) => {
        if (e.target.closest('a, button')) return;
        isDown = true;
        didDrag = false;
        interacting = true;
        startX = e.pageX - heroContainer.getBoundingClientRect().left;
        scrollStart = heroContainer.scrollLeft;
        heroContainer.style.cursor = 'grabbing';
        // Temporarily disable smooth scroll so drag feels direct
        heroContainer.style.scrollBehavior = 'auto';
        cancelAutoscroll();
        e.preventDefault();
    });

    const endDrag = () => {
        if (!isDown) return;
        isDown = false;
        interacting = false;
        heroContainer.style.cursor = 'grab';
        heroContainer.style.scrollBehavior = '';
        // Snap to nearest slide
        goTo(currentIndex());
        scheduleAutoscroll(5000);
    };

    heroContainer.addEventListener('mouseup',    endDrag);
    heroContainer.addEventListener('mouseleave', endDrag);

    heroContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        const x     = e.pageX - heroContainer.getBoundingClientRect().left;
        const delta = x - startX;
        if (Math.abs(delta) > THRESHOLD) {
            didDrag = true;
            heroContainer.scrollLeft = scrollStart - delta;
        }
    });

    // Suppress accidental link clicks after a drag
    heroContainer.addEventListener('click', (e) => {
        if (didDrag) {
            e.preventDefault();
            e.stopPropagation();
            didDrag = false;
        }
    }, true);
})();
