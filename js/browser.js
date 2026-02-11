let browserDataId = 0;

function createBrowser(href, id) {
    const browser = document.createElement('div');
    browser.setAttribute('id', browserDataId + 'browser');
    browser.setAttribute('class', 'explorer');
    browser.style.zIndex = topZ;
    browser.innerHTML = `
            <div class="explorer-header" id="${browserDataId}browser-header"></div>
            <div class="explorer-content">
                <div class="explorer-content-topbar">
                    <div class="explorer-content-topbar-left browser-topbar">
                        <div class="browser-crm-container">
                            <div class="explorer-crm browser-crm">
                                <button class="explorer-close"></button>
                                <button class="explorer-minimize"></button>
                                <button class="explorer-restore"></button>

                            </div>
                        </div>
                        <svg class="explorer-back" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 12H18M6 12L11 7M6 12L11 17"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>

                        <h3 class="explorer-content-topbar-title">Navegador</h3>
                    </div>
                    <div class="explorer-content-topbar-right browser-right">
                        <input class="browser-url" type="text" readonly value="${href}">
                    </div>
                </div>
                <div class="explorer-content-items browser-frame-container">
                    <iframe class="browser-iframe" allow="camera" src="${href}"
                        frameborder="0"></iframe>
                </div>
            </div>`

    main.appendChild(browser);
    dragElement(browser);
    browser.onpointerdown = () => {
        bringToFront(browser);
    }
    browser.querySelector('.explorer-close')
        .addEventListener('pointerdown', e => e.stopPropagation());

    browser.querySelector('.explorer-close')
        .addEventListener('click', () => {
            browser.remove();
        });
    browser.querySelector('.explorer-back')
        .addEventListener('pointerdown', e => e.stopPropagation());

    browser.querySelector('.explorer-back')
        .addEventListener('click', () => {
            browser.remove();
        });
    browser.querySelector('.explorer-restore')
        .addEventListener('click', () => {
            browser.classList.toggle('explorer-max');
        });
    browserDataId++
}