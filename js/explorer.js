const main = document.getElementById('main');
const openAnchors = document.querySelectorAll('[id^="open-"]');
if (openAnchors) {
    for (const anchor of openAnchors) {
        anchor.onclick = () => {
            const explorer = document.getElementById(anchor.id.match(/\d+/)[0] + "explorer");
            if (explorer) {
                explorer.style.visibility = "visible";
            }
        }
    }
}


let globalProject;

fetchURL("json/projectsInfo.json").then(projects => {
    globalProject = projects;
    const asideItems = returnAsideItems(projects.projects);
    for (let i = 0; i < projects.projects.length; i++) {
        const explorer = createExplorer(asideItems, projects.projects[i], i);
        main.appendChild(explorer);
        dragElement(explorer)
        explorer.addEventListener('click', e => {
            const item = e.target.closest('.explorer-content-item');
            if (!item) return;

            const projectIndex = Number(item.dataset.project);
            const itemIndex = Number(item.dataset.item);

            openDetailsExplorer(projectIndex, itemIndex, explorer, asideItems, i);
            if (!isIOSMode()) {
                explorer.style.visibility = 'hidden';
            }
        });

        explorer.onpointerdown = () => {
            bringToFront(explorer);
        }
        explorer.querySelector('.explorer-close')
            .addEventListener('pointerdown', e => e.stopPropagation());

        explorer.querySelector('.explorer-close')
            .addEventListener('click', () => {
                explorer.style.visibility = 'hidden';
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
    }
})

function createExplorer(asideItems, projectInfo, i) {

    const projectItems = returnProjectItems(projectInfo.projects, i);
    const explorer = document.createElement('div');
    explorer.innerHTML = ` 
        <div class="explorer-header" id="${i}explorer-header"></div>
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
                        <h3 class="explorer-content-topbar-title">${projectInfo.title}</h3>

                    </div>
                    <div class="explorer-content-topbar-right">
                        <button class="viewfinder">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000">
                                    <path
                                        d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                                         stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round">
                                    </path>
                            </svg></button>
                    </div>
                    
                </div>
                <div class="explorer-content-items">
                        ${projectItems}
                    </div>
            </div>`
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
        });

        asideList.appendChild(clone);
    });

    explorer.setAttribute('id', i + "explorer");
    explorer.setAttribute('class', "explorer");
    if (!isIOSMode) {

        explorer.style.left = window.innerHeight / 20 + (20 * i) + "px";
        explorer.style.top = window.innerHeight / 20 + 20 + (20 * i) + "px";
    }
    explorer.style.visibility = "hidden";
    return explorer;
}

function returnAsideItems(projects) {
    return projects.map((project, i) => {
        const item = document.createElement('li');
        item.className = 'explorer-aside-section-item';
        item.dataset.index = i;

        item.innerHTML = `
            <svg class="explorer-aside-section-item-icon" xmlns="http://www.w3.org/2000/svg"
                version="1.1" viewBox="0 0 64.8 54" fill="#1392d1">
                <path
                    d="M19,4.1c.3,0,.7.1,1,.3.7.3,1.1.6,1.7,1.2.4.3.8.7,1.3,1.1,1.5,1.1,3.2,1.8,5.1,2.2h.3c0,0,29.8,0,29.8,0,1.2,0,2.1.9,2.1,2.1v36.8c0,1.2-.9,2.1-2.1,2.1H6.5c-1.2,0-2.1-.9-2.1-2.1V6.2c0-.6.2-1.1.6-1.5.6-.6,1.3-.6,1.5-.6h12.5M18.5,0H5.2c-.4,0-2.2,0-3.7,1.5-.9.9-1.5,2.2-1.5,3.7v43.6c0,2.9,2.3,5.2,5.2,5.2h54.3c2.9,0,5.2-2.3,5.2-5.2V10.2c0-2.9-2.3-5.2-5.2-5.2h-30.9c-2-.4-3.4-1.2-4.2-1.8-1.3-1-2.1-2-3.9-2.7C19.7.2,19,0,18.5,0h0Z" />
                <path
                    d="M57.8,18.1c1.1,0,2.1.9,2.1,2v28c0,1.1-.9,2-2.1,2H6.9c-1.1,0-2.1-.9-2.1-2v-28c0-1.1.9-2,2.1-2h50.9M59.5,14.1H5.2C2.3,14.1,0,16.3,0,19.1v29.9C0,51.7,2.3,54,5.2,54h54.3c2.9,0,5.2-2.2,5.2-5v-29.9c0-2.7-2.3-5-5.2-5h0Z" />
            </svg>
            <p class="explorer-aside-section-item-text">${project.title}</p>
        `;

        return item;
    });

}

function returnProjectItems(projects = [], projectIndex) {
    return projects
        .map((project, i) => addProjectItem(project, projectIndex, i))
        .join('');
}

function addProjectItem(project, projectIndex, itemIndex) {
    const imgTypes = ["png", "jpg"]; //Tipos de imagen
    //Si el tipo de archivo es imagen, insertar un img tag, si es video, un video tag
    const media = imgTypes.includes(project.assetURL.slice(project.assetURL.length - 3)) ?  //Chequea los ultimos tres caracteres de la url y los compara con el array de imgTypes
        `<img draggable="false" src='assets/img/${project.assetURL}' alt=""></img>` : `<video draggable="false" disablePictureInPicture autoplay muted loop playsinline src='assets/img/${project.assetURL}'></video>`;

    return `
        <div class="explorer-content-item"
            data-project="${projectIndex}"
            data-item="${itemIndex}">
            ${media}
            <p>${project.title}</p>
        </div>`
}

function swapExplorer(current, swap) {
    swap.style.top = current.style.top;
    swap.style.left = current.style.left;
    swap.style.height = current.style.height;
    swap.style.width = current.style.width;
    swap.style.zIndex = current.style.zIndex;
    if (current.classList.contains('explorer-max')) {
        swap.classList.add('explorer-max');
    } else {
        swap.classList.remove('explorer-max');
    }
    current.style.visibility = "hidden";
    swap.style.visibility = "visible";

}




