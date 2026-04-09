let isAllLoaded = false;

let isOneLoaded = true;

/**Fetch al JSON
 * @params url
*/
const fetchURL = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}


/**Devolver el HTML de una tarjeta
 * @param Object project
 * @param Number index
 */
function returnCard(project, index) {
    const imgTypes = ["png", "jpg"];
    const idx = index !== undefined ? String(index + 1).padStart(2, '0') : '—';
    const media = imgTypes.includes(project.assetURL.slice(project.assetURL.length - 3)) ?
        `<a href='${project.href}'><img draggable="false" style='${project.injectedStyle}' src='assets/img/${project.assetURL}' alt="${project.title}"></a>` :
        `<a href='${project.href}'><video draggable="false" style='${project.injectedStyle}' autoplay muted loop playsinline src='assets/img/${project.assetURL}'></video></a>`;

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
