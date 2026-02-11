function openDetailsExplorer(projectIndex, itemIndex, parentExplorer, asideItems, i) {
    const project = globalProject.projects[projectIndex];
    const item = project.projects[itemIndex];

    const details = createDetailsExplorer(item, asideItems, i, itemIndex);

    details.style.top = parentExplorer.style.top;
    details.style.left = parentExplorer.style.left;
    details.style.width = parentExplorer.style.width;
    details.style.height = parentExplorer.style.height;
    details.style.zIndex = ++topZ;
    main.appendChild(details);
    dragElement(details);
}
function createDetailsExplorer(item, asideItems, i, itemIndex) {
    const explorer = document.createElement('div');
    explorer.className = 'explorer details-explorer';
    explorer.id = i + '' + itemIndex + '' + 'explorer';
    const gallery = item.gallery?.length
        ? item.gallery
        : [item.assetURL];
    explorer.innerHTML = `
        <div class="explorer-header" id="${i + '' + itemIndex + '' + 'explorer-header'}"></div>
        <div class="explorer-aside">

                <div class="explorer-crm">
                    <button class="explorer-close"></button>
                    <button class="explorer-minimize"></button>
                    <button class="explorer-restore"></button>

                </div>
                <div class="explorer-aside-section">
                    <h4 class="explorer-aside-section-title">Favoritos</h4>
                    <ul class="explorer-aside-list">
                    </ul>
                </div>
            </div>
        <div class="explorer-content">
            <div class="explorer-content-topbar">
                <div class="explorer-content-topbar-left">
                    <svg class="explorer-back" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 12H18M6 12L11 7M6 12L11 17"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>

                    <h3 class="explorer-content-topbar-title">${globalProject.projects[i].title}</h3>
                </div>
                <div class="explorer-content-topbar-right">
                </div>
                
            </div>
            <div class="details-content">
                <div class="details-media">
                    <div class="details-viewer">
                        ${createMediaElement(gallery[0])}
                    </div>
    
                    ${createGallery(gallery, i, itemIndex)}
                </div>
                <div class="details-content-text">
                    <h3>${item.title}</h3>
                    <p>${item.description ?? ''}</p>
                </div>
            </div>
        </div>
    `;
    const asideList = explorer.querySelector('.explorer-aside-list');

    asideItems.forEach((item, index) => {
        const clone = item.cloneNode(true);

        if (index === i) {
            clone.classList.add('explorer-aside-section-item-active');
        }

        clone.addEventListener('click', () => {
            swapExplorer(
                explorer,
                document.getElementById(index + 'explorer')
            );
            explorer.remove();
        });

        asideList.appendChild(clone);
    });
    explorer.querySelector('.explorer-close')
        .addEventListener('pointerdown', e => e.stopPropagation());

    explorer.querySelector('.explorer-close')
        .addEventListener('click', () => {
            explorer.remove();
        });
    explorer.querySelector('.explorer-back')
        .addEventListener('pointerdown', e => e.stopPropagation());

    explorer.querySelector('.explorer-back')
        .addEventListener('click', () => {
            explorer.style.visibility = 'hidden';
        });
    explorer.querySelector('.explorer-restore')
        .addEventListener('click', () => {
            explorer.classList.toggle('explorer-max');
        });
    explorer.onpointerdown = () => {
        bringToFront(explorer);
    }

    const viewer = explorer.querySelector('.details-viewer');

    explorer.addEventListener('click', e => {
        const thumb = e.target.closest('.details-gallery-item');
        if (!thumb) return;

        const src = thumb.dataset.src;
        viewer.innerHTML = createMediaElement(src);
    });

    return explorer;
}

function isImage(src) {
    return /\.(png|jpg|jpeg|webp)$/i.test(src);
}
function createMediaElement(src) {
    return isImage(src)
        ? `<img src="assets/img/${src}" draggable="false">`
        : `<video src="assets/img/${src}" autoplay muted loop playsinline draggable="false" disablePictureInPicture></video>`;
}
function createGallery(gallery = [], projectIndex, itemIndex) {
    return `
        <div class="details-gallery">
            ${gallery.map((src, i) => `
                <div class="details-gallery-item"
                     data-project="${projectIndex}"
                     data-item="${itemIndex}"
                     data-src="${src}">
                    ${createMediaElement(src)}
                </div>
            `).join('')}
        </div>
    `;
}