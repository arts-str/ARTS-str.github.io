let isAllLoaded = false;
let isOneLoaded = true;

const fetchURL = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

/**
 * Ensure muted looping videos play on Safari.
 * Safari needs muted+playsInline as JS properties AND an explicit play()
 * after layout. autoplay attribute alone fails for dynamically injected elements.
 * setTimeout(0) defers until after the current call stack clears and the
 * browser has processed the new DOM nodes.
 */
function fixVideos(container) {
    const videos = container.querySelectorAll('video');
    videos.forEach(v => {
        v.muted = true;
        v.playsInline = true;
    });
    setTimeout(() => {
        videos.forEach(v => v.play().catch(() => {}));
    }, 0);
}

// Keep observeVideos as an alias so existing call sites don't break
const observeVideos = fixVideos;

// Strip layout-critical properties from injectedStyle so they
// can't override responsive CSS rules
function sanitizeInjectedStyle(style) {
    return (style || '').replace(/\b(width|height|max-width|max-height)\s*:[^;]+;?/gi, '').trim();
}

function returnCard(project, index) {
    const ext = project.assetURL.split('.').pop().toLowerCase();
    const isImg = ['png', 'jpg', 'jpeg', 'webp', 'gif'].includes(ext);
    const idx = index !== undefined ? String(index + 1).padStart(2, '0') : '—';
    const style = sanitizeInjectedStyle(project.injectedStyle);
    const media = isImg
        ? `<a href='${project.href}'><img loading="lazy" draggable="false" style='${style}' src='assets/img/${project.assetURL}' alt="${project.title}"></a>`
        : `<a href='${project.href}'><video draggable="false" style='${style}' autoplay muted loop playsinline src='assets/img/${project.assetURL}'></video></a>`;

    return `
    <fieldset class="project-card" data-index="${idx}" data-project-index="${index}" style="border-color: ${project.color || 'var(--border-bright)'}">
        <legend style="color:${project.color || 'var(--text)'}">${project.title}</legend>
        ${media}
        <section>
            <p>${project.description}</p>
        </section>
    </fieldset>
    `;
}
