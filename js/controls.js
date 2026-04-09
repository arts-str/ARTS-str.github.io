function initControls() {

    const nextControl = document.querySelectorAll('.next');
    for (const control of nextControl) {
        control.onclick = (e) => {
            e.preventDefault();
            // .controls is abs-positioned inside .carousel-track
            // article is the previousElementSibling of .controls
            const scrollParent = e.target.closest('.controls').previousElementSibling;
            const firstChild = scrollParent.children[0];
            scrollParent.scrollBy({ top: 0, left: firstChild.clientWidth + convertRemToPixels(2), behavior: "smooth" });
        }
    }

    const prevControl = document.querySelectorAll('.prev');
    for (const control of prevControl) {
        control.onclick = (e) => {
            e.preventDefault();
            const scrollParent = e.target.closest('.controls').previousElementSibling;
            const firstChild = scrollParent.children[0];
            scrollParent.scrollBy({ top: 0, left: -(firstChild.clientWidth + convertRemToPixels(2)), behavior: "smooth" });
        }
    }

    // Init drag on both article carousels
    initDrag(document.getElementById('web'));
    initDrag(document.getElementById('projects'));
}

function convertRemToPixels(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

/**
 * Mouse-drag-to-scroll for a horizontally scrollable element.
 * Suppresses click events on children if the user actually dragged.
 */
function initDrag(el) {
    if (!el) return;

    let isDown = false;
    let startX;
    let scrollStart;
    let didDrag = false;
    const DRAG_THRESHOLD = 4; // px before we consider it a drag

    el.addEventListener('mousedown', (e) => {
        // Only skip drag initiation for actual buttons
        if (e.target.closest('button')) return;
        isDown = true;
        didDrag = false;
        startX = e.pageX - el.offsetLeft;
        scrollStart = el.scrollLeft;
        el.style.cursor = 'grabbing';
        e.preventDefault(); // prevents native link/image drag
    });

    el.addEventListener('mouseleave', () => {
        isDown = false;
        el.style.cursor = '';
    });

    el.addEventListener('mouseup', () => {
        isDown = false;
        el.style.cursor = '';
    });

    el.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        const x = e.pageX - el.offsetLeft;
        const delta = x - startX;
        if (Math.abs(delta) > DRAG_THRESHOLD) {
            didDrag = true;
            // Disable smooth scroll during drag for responsiveness
            const prev = el.style.scrollBehavior;
            el.style.scrollBehavior = 'auto';
            el.scrollLeft = scrollStart - delta;
            el.style.scrollBehavior = prev;
        }
    });

    // Suppress click on child links/cards if user dragged
    el.addEventListener('click', (e) => {
        if (didDrag) {
            e.preventDefault();
            e.stopPropagation();
            didDrag = false;
        }
    }, true);

    // Default cursor hint
    el.style.cursor = 'grab';
}
