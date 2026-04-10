var modal = document.getElementById("popup-modal");

// Only close the modal if the click both STARTED and ENDED on the backdrop.
// Without this, dragging inside the gallery and releasing over the backdrop
// would fire window.onclick and close the modal.
let mousedownOnBackdrop = false;

modal.addEventListener('mousedown', (e) => {
    mousedownOnBackdrop = (e.target === modal);
});

window.onclick = function (event) {
    if (event.target === modal && mousedownOnBackdrop) {
        modal.style.display = "none";
        window.location.search = "";
    }
    mousedownOnBackdrop = false;
}

/* ── Markup builder ────────────────────────────────────────── */

function returnModal(project) {
    const media   = returnMedia(project).join("");
    const anchors = returnGallery(project).join("");

    return `
    <fieldset style="color:${project.color}; border: 1px solid ${project.color}" class="modal-content">
        <legend style="color:${project.color}">${project.title}</legend>
        <span style="color:${project.color}" class="close">&times;</span>
        <div class="modal-carousel">
            <div class="modal-gallery">${media}</div>
            <button class="modal-prev" aria-label="Previous">&#10094;</button>
            <button class="modal-next" aria-label="Next">&#10095;</button>
            <button class="modal-maximize" aria-label="Maximizar galería">&#x2922;</button>
            <button class="modal-mute" aria-label="Activar sonido" style="display:none">&#x1F507;</button>
        </div>
        <div class="gallery-anchors">${anchors}</div>
        <p>${project.description}</p>
    </fieldset>`;
}

function returnMedia(project) {
    const imgTypes = ["png", "jpg", "jpeg", "webp", "gif"];
    return project.gallery.map((el, i) => {
        const ext = el.split('.').pop().toLowerCase();
        const isImg = imgTypes.includes(ext);
        return isImg
            ? `<img draggable="false" id="gslide-${i}" src="assets/img/${el}" alt="">`
            : `<video draggable="false" id="gslide-${i}" autoplay muted loop playsinline><source src="assets/img/${el}"></video>`;
    });
}

function returnGallery(project) {
    return project.gallery.map((e, i) =>
        `<a class="gallery-anchor" data-index="${i}">&bull;</a>`
    );
}

/* ── Gallery controller (called after modal HTML is injected) ── */

function initModalGallery() {
    const gallery  = modal.querySelector('.modal-gallery');
    const anchors  = modal.querySelectorAll('.gallery-anchor');
    const btnPrev  = modal.querySelector('.modal-prev');
    const btnNext  = modal.querySelector('.modal-next');
    if (!gallery) return;

    const slideCount = () => gallery.children.length;
    const slideW     = () => gallery.clientWidth;
    const currentIdx = () => Math.round(gallery.scrollLeft / slideW());

    function goTo(i) {
        const total = slideCount();
        const idx   = ((i % total) + total) % total;
        gallery.style.scrollBehavior = 'smooth';
        gallery.scrollLeft = idx * slideW();
    }

    function updateAnchors() {
        const i = currentIdx();
        anchors.forEach((a, idx) =>
            a.classList.toggle('active-gallery-anchor', idx === i)
        );
    }

    // Anchor clicks
    anchors.forEach((a, i) => {
        a.addEventListener('click', (e) => {
            e.preventDefault();
            goTo(i);
        });
    });

    // Buttons
    btnPrev && btnPrev.addEventListener('click', () => goTo(currentIdx() - 1));
    btnNext && btnNext.addEventListener('click', () => goTo(currentIdx() + 1));

    // ── Maximize ────────────────────────────────────────────
    const btnMax      = modal.querySelector('.modal-maximize');
    const carousel    = modal.querySelector('.modal-carousel');
    const fsOverlay   = document.getElementById('gallery-fullscreen');
    // Keep a reference to carousel's original position
    const carouselParent    = carousel.parentNode;
    const carouselNextSibling = carousel.nextSibling;
    let isMaximized = false;

    function openFullscreen() {
        isMaximized = true;
        fsOverlay.appendChild(carousel);
        fsOverlay.classList.add('active');
        btnMax.textContent = '⤡';
        btnMax.setAttribute('aria-label', 'Restaurar galería');
        requestAnimationFrame(() => {
            gallery.style.scrollBehavior = 'auto';
            gallery.scrollLeft = currentIdx() * slideW();
            gallery.style.scrollBehavior = 'smooth';
            syncMuteButton();
        });
    }

    function closeFullscreen() {
        isMaximized = false;
        // Reset mute state on exit
        isMuted = true;
        Array.from(gallery.children).forEach(el => {
            if (el.tagName === 'VIDEO') el.muted = true;
        });
        carouselParent.insertBefore(carousel, carouselNextSibling);
        fsOverlay.classList.remove('active');
        btnMax.textContent = '⤢';
        btnMax.setAttribute('aria-label', 'Maximizar galería');
        requestAnimationFrame(() => {
            gallery.style.scrollBehavior = 'auto';
            gallery.scrollLeft = currentIdx() * slideW();
            gallery.style.scrollBehavior = 'smooth';
            syncMuteButton();
        });
    }

    btnMax && btnMax.addEventListener('click', () => {
        isMaximized ? closeFullscreen() : openFullscreen();
    });

    document.addEventListener('keydown', function onKey(e) {
        if (e.key === 'Escape' && isMaximized) {
            e.stopPropagation();
            closeFullscreen();
        }
    });

    // ── Mute button ──────────────────────────────────────────
    const btnMute = modal.querySelector('.modal-mute');
    let isMuted = true; // videos start muted

    function currentVideo() {
        const slide = gallery.children[currentIdx()];
        return slide && slide.tagName === 'VIDEO' ? slide : null;
    }

    function syncMuteButton() {
        if (!btnMute) return;
        const vid = currentVideo();
        if (!isMaximized || !vid) {
            btnMute.style.display = 'none';
            return;
        }
        btnMute.style.display = 'inline-flex';
        btnMute.textContent    = isMuted ? '🔇' : '🔊';
        btnMute.setAttribute('aria-label', isMuted ? 'Activar sonido' : 'Silenciar');
    }

    btnMute && btnMute.addEventListener('click', () => {
        const vid = currentVideo();
        if (!vid) return;
        isMuted   = !isMuted;
        vid.muted = isMuted;
        syncMuteButton();
    });

    // Sync button and mute state on every slide scroll
    gallery.addEventListener('scroll', () => {
        Array.from(gallery.children).forEach(el => {
            if (el.tagName === 'VIDEO') el.muted = isMuted;
        });
        syncMuteButton();
    }, { passive: true });
    updateAnchors();

    // ── Mouse drag ──────────────────────────────────────────
    let isDown    = false;
    let startX    = 0;
    let scrollStart = 0;
    let didDrag   = false;
    const THRESHOLD = 6;

    gallery.addEventListener('mousedown', (e) => {
        if (e.target.closest('button')) return;
        isDown = true;
        didDrag = false;
        startX = e.pageX - gallery.getBoundingClientRect().left;
        scrollStart = gallery.scrollLeft;
        gallery.style.scrollBehavior = 'auto';
        gallery.style.cursor = 'grabbing';
        e.preventDefault();
    });

    const endDrag = () => {
        if (!isDown) return;
        isDown = false;
        gallery.style.cursor = 'grab';
        // snap to nearest
        gallery.style.scrollBehavior = 'smooth';
        gallery.scrollLeft = currentIdx() * slideW();
    };

    gallery.addEventListener('mouseup',    endDrag);
    gallery.addEventListener('mouseleave', endDrag);

    gallery.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        const x = e.pageX - gallery.getBoundingClientRect().left;
        const delta = x - startX;
        if (Math.abs(delta) > THRESHOLD) {
            didDrag = true;
            gallery.scrollLeft = scrollStart - delta;
        }
    });

    gallery.addEventListener('click', (e) => {
        if (didDrag) {
            e.preventDefault();
            e.stopPropagation();
            didDrag = false;
        }
    }, true);
}
