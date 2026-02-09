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

                        <h3 class="explorer-content-topbar-title">Navegador</h3>
                    </div>
                    <div class="explorer-content-topbar-right browser-right">
                        <input class="browser-url" type="text" readonly value="${href}">
                    </div>
                </div>
                <div class="explorer-content-items">
                    <iframe class="browser-iframe" allow="camera" src="${href}"
                        frameborder="0"></iframe>
                </div>
            </div>`

    main.appendChild(browser);
    dragElement(browser);
    browser.onmousedown = () => {
        bringToFront(browser);
    }
    browser.querySelector('.explorer-close')
        .addEventListener('mousedown', e => e.stopPropagation());

    browser.querySelector('.explorer-close')
        .addEventListener('click', () => {
            browser.remove();
        });
    browser.querySelector('.explorer-restore')
        .addEventListener('click', () => {
            browser.classList.toggle('explorer-max');
        });
    browserDataId++
}